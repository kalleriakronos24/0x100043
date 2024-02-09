"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("./auth.service"));
const book_service_1 = __importDefault(require("./book.service"));
const order_service_1 = __importDefault(require("./order.service"));
class Service {
    authService() {
        return new auth_service_1.default();
    }
    bookService() {
        return new book_service_1.default();
    }
    orderService() {
        return new order_service_1.default();
    }
}
exports.default = Service;
