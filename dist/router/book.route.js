"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../controller"));
class BookRoutes extends controller_1.default {
    constructor() {
        super();
        this.router = (0, express_1.Router)();
    }
    route() {
        return [
            this.router.get('/book/list', super.bookController().retrievePaginatedBooks),
        ];
    }
}
exports.default = BookRoutes;
