import { Router } from 'express';
import Controller from '../controller';

class BookRoutes extends Controller {
  router: Router;
  constructor() {
    super();
    this.router = Router();
  }
  route() {
    return [
      this.router.get('/book/list', super.bookController().retrievePaginatedBooks),
    ];
  }
}

export default BookRoutes;
