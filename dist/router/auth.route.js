"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = __importDefault(require("../controller"));
class AuthRoutes extends controller_1.default {
    constructor() {
        super();
        this.router = (0, express_1.Router)();
    }
    route() {
        return [
            this.router.post('/auth/sign-up', super.authController().userRegister),
            this.router.post('/auth/sign-in', super.authController().userLogin),
            this.router.get('/auth/test', (req, res) => {
                res.send('Hello i am a robot');
            })
        ];
    }
}
;
exports.default = AuthRoutes;
