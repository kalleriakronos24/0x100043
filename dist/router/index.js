"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = __importDefault(require("./auth.route"));
class Routes {
    constructor() { }
    route() {
        return [
            new auth_route_1.default().route()
        ];
    }
    ;
}
;
exports.default = Routes;
