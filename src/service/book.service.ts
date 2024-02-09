// imports
import JwtService from './jwt.service';
import bcrypt from 'bcrypt';
import CustomResponse from '../util/custom-response.util';
import { Book, Prisma, PrismaClient, User } from '@prisma/client';
import { Response } from 'express';
import { createPaginator } from 'prisma-pagination';

class BookService {
  customResponse = new CustomResponse();
  jwt = new JwtService();
  prisma = new PrismaClient();
  paginate = createPaginator({ perPage: 20 });
  constructor() {}

  /**
   *
   * @param {*} step number
   * @description get all paginated books, applies inifinite scrolling in the frontend
   * @returns Paginated Books
   */
  async retrieveBookPaginated(step: number, res: Response, search?: string) {
    try {
      const count = await this.prisma.book.count({
        where: {
          createdAt: {
            not: undefined,
          },
        },
      });

      let query: {} = {
        createdAt: {
          not: undefined,
        },
      };

      if (search) {
        query = {
          createdAt: {
            not: undefined,
          },
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { writer: { contains: search, mode: 'insensitive' } },
          ],
        };
      }

      let result = await this.paginate<Book, Prisma.BookFindManyArgs>(
        this.prisma.book,
        {
          where: query,
          orderBy: {
            createdAt: 'desc',
          },
        },
        { page: 1, perPage: step },
      );

      let output = {};

      if (step >= count) {
        output = {
          data: result.data,
          meta: {
            ...result.meta,
            isExceed: true,
          },
        };
      } else {
        output = result;
      }

      this.customResponse.setSuccess(200, 'Retrieve success', { ...output });
      return this.customResponse.send(res);
    } catch (error) {
      this.customResponse.setError(400, JSON.stringify(error));
      return this.customResponse.send(res);
    }
  }
}

export default BookService;
