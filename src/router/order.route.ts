import { Router } from 'express';
import Controller from '../controller';

class OrderRoutes extends Controller {
  router: Router;
  constructor() {
    super();
    this.router = Router();
  }
  route() {
    return [
      this.router.post(
        '/order/checkout',
        super.orderController().checkoutOrder,
      ),
    ];
  }
}

export default OrderRoutes;
