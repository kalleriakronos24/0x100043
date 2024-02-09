import { Request, Response } from 'express';
import Service from '../service';
import { Book } from '@prisma/client';

type RequestBody = {
  data: Book[];
};
class OrderController extends Service {
  constructor() {
    super();
  }

  async checkoutOrder(req: Request, res: Response) {
    const order = super.orderService();
    const body = req.body as RequestBody;
    return await order.checkoutOrder(req, res, body.data);
  }
}

export default OrderController;
