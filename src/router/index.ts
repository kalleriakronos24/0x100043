import AuthRoutes from './auth.route';
import BookRoutes from './book.route';
import OrderRoutes from './order.route';

class Routes {
  constructor() {}
  route() {
    return [
      new AuthRoutes().route(),
      new BookRoutes().route(),
      new OrderRoutes().route(),
    ];
  }
}

export default Routes;
