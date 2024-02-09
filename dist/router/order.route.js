"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../controller"));
class OrderRoutes extends controller_1.default {
    constructor() {
        super();
        this.router = (0, express_1.Router)();
    }
    route() {
        return [
            this.router.post('/order/checkout', super.orderController().checkoutOrder),
        ];
    }
}
exports.default = OrderRoutes;
