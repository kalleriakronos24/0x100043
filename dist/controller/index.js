"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("./auth.controller"));
class Controller {
    constructor() { }
    authController() {
        return new auth_controller_1.default();
    }
}
;
exports.default = Controller;
