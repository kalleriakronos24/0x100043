"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("./auth.controller"));
const book_controller_1 = __importDefault(require("./book.controller"));
const order_controller_1 = __importDefault(require("./order.controller"));
class Controller {
    constructor() { }
    authController() {
        return new auth_controller_1.default();
    }
    bookController() {
        return new book_controller_1.default();
    }
    orderController() {
        return new order_controller_1.default();
    }
}
exports.default = Controller;
