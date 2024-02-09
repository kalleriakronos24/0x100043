// imports
import JwtService from './jwt.service';
import bcrypt from 'bcrypt';
import CustomResponse from '../util/custom-response.util';
import { Book, OrderStatus, Prisma, PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';
import { retrieveUserPoints } from '../repository/user.repository';

class OrderService {
  customResponse = new CustomResponse();
  jwt = new JwtService();
  prisma = new PrismaClient();
  constructor() {}

  async checkoutOrder(req: Request, res: Response, payload: Book[]) {
    return await this.prisma.$transaction(async (tx) => {
      try {
        if (payload.length <= 0) {
          this.customResponse.setError(403, 'Cart cannot be empty');
          return this.customResponse.send(res);
        }

        const retrieveUser = this.jwt.retrieveUserInformation(req, res) as User;

        if (!retrieveUser?.id) {
          this.customResponse.setError(401, 'User is not authenticated');
          return this.customResponse.send(res);
        }

        const user = retrieveUser;
        const cartAccumulate = payload.reduce((a, b) => a + b.price, 0);

        const userPoints = await retrieveUserPoints(user.id);

        if (cartAccumulate >= userPoints) {
          this.customResponse.setError(
            403,
            `Cannot checkout order, order amount is exceeding your ${userPoints} points.`,
          );
          return this.customResponse.send(res);
        }

        const refNumber = 'INV-XXX/XX/XXXX/';
        let totalPrice = 0;
        for (const cart of payload) {
          const queryPayload = {
            referenceNumber: refNumber,
            bookId: cart.id,
            orderAt: new Date(),
            orderBy: user.id,
            status: OrderStatus.SUCCESS,
          };
          totalPrice += cart.price;

          await tx.order.create({
            data: queryPayload,
          });
        }
        await tx.orderSummary.create({
          data: {
            referenceNumber: refNumber,
            orderBy: user.id,
            totalPrice: totalPrice,
            checkoutAt: new Date(),
          },
        });

        await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            points: userPoints - totalPrice,
          },
        });

        this.customResponse.setSuccess(200, 'Checkout Success', {});
        return this.customResponse.send(res);
      } catch (error) {
        this.customResponse.setError(400, JSON.stringify(error));
        return this.customResponse.send(res);
      }
    });
  }
}

export default OrderService;
