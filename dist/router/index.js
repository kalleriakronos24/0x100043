"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth.route"));
const book_route_1 = __importDefault(require("./book.route"));
const order_route_1 = __importDefault(require("./order.route"));
class Routes {
    constructor() { }
    route() {
        return [
            new auth_route_1.default().route(),
            new book_route_1.default().route(),
            new order_route_1.default().route(),
        ];
    }
}
exports.default = Routes;
