import { Request, Response } from 'express';
import Service from '../service';

type PaginatedBooksParam = {
  step: string;
  search?: string;
};
class BookController extends Service {
  constructor() {
    super();
  }

  async retrievePaginatedBooks(req: Request, res: Response) {
    const params = req.query as PaginatedBooksParam;
    const book = super.bookService();
    if (params?.step) {
      const step = parseInt(params.step);
      return await book.retrieveBookPaginated(step, res, params.search);
    } else {
      return res.status(403).json({
        message: 'Unknown Params',
      });
    }
  }
}

export default BookController;
