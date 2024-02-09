"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_middleware_1 = __importDefault(require("./jwt.middleware"));
class Middlewares {
    jwt() {
        return new jwt_middleware_1.default();
    }
}
;
exports.default = Middlewares;
