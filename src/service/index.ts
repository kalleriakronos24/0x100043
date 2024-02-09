import AuthService from './auth.service';
import BookService from './book.service';
import OrderService from './order.service';

class Service {
  authService() {
    return new AuthService();
  }
  bookService() {
    return new BookService();
  }
  orderService() {
    return new OrderService();
  }
}

export default Service;
