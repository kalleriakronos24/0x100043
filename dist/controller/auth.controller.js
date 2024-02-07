"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("../service"));
class AuthController extends service_1.default {
    constructor() {
        super();
    }
    ;
    /**
     *
     * @param {*} req Request
     * @param {*} res Response
     * @description registering a user to the database via endpoint /auth/sign-up with all the data provided by the client
     * @returns JwtToken if all the conditions meet
     */
    userRegister(req, res) {
        const _super = Object.create(null, {
            authService: { get: () => super.authService }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const auth = _super.authService.call(this);
            const body = req.body;
            return yield auth.userRegister(res, body);
        });
    }
    ;
    /**
     *
     * @param {*} req Request
     * @param {*} res Response
     * @description login user to the server, if all the data is valid, gives a user JwtToken to access the frontend's application
     * @returns JwtToken if all the conditions meet
     */
    userLogin(req, res) {
        const _super = Object.create(null, {
            authService: { get: () => super.authService }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const auth = _super.authService.call(this);
            const body = req.body;
            return yield auth.login(res, body);
        });
    }
}
;
exports.default = AuthController;
