import AuthController from './auth.controller';
import BookController from './book.controller';
import OrderController from './order.controller';

class Controller {
  constructor() {}

  authController() {
    return new AuthController();
  }

  bookController() {
    return new BookController();
  }

  orderController(){
    return new OrderController();
  }
}

export default Controller;
