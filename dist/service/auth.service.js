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
// imports
const jwt_service_1 = __importDefault(require("./jwt.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const custom_response_util_1 = __importDefault(require("../util/custom-response.util"));
const client_1 = require("@prisma/client");
class AuthService {
    constructor() {
        this.customResponse = new custom_response_util_1.default();
        this.jwt = new jwt_service_1.default();
        this.prisma = new client_1.PrismaClient();
    }
    /**
     *
     * @param {*} user Users
     * @description generate token jwt, this only triggers if all the validation is meet the conditions
     * @returns JwtToken1
     */
    generateToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.jwt.signInToken(user);
            return token;
        });
    }
    /**
     *
     * @param {*} password string
     * @description Password Hashing using bcrypt
     * @returns hashedPassword with length 10
     */
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = bcrypt_1.default.hashSync(password, 10);
            return hashPassword;
        });
    }
    /**
     *
     * @param {*} response Response
     * @param {*} user { email: string , password: string }
     * @async userRegister
     * @description Service to Register user to the Database
     * @returns Users { id: number, fullname: string, username: string, wallet: number }
     */
    userRegister(response, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = user;
            const usernameCheck = yield this.checkIfUsernameExist(username);
            if (usernameCheck) {
                this.customResponse.setError(401, 'Username has been used, please use another username');
                return this.customResponse.send(response);
            }
            const hashPassword = yield this.hashPassword(password);
            const newUser = yield this.prisma.user.create({
                data: Object.assign(Object.assign({}, user), { password: hashPassword }),
            });
            // generate token
            // const token = await this.generateToken({ ...newUser});
            this.customResponse.setSuccess(201, 'User Created!', newUser);
            return this.customResponse.send(response);
        });
    }
    /**
     *
     * @param {*} username string
     * @description username validation, check username if exists
     * @returns Null | Users
     */
    checkIfUsernameExist(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield this.prisma.user.findFirst({
                where: {
                    username: username,
                },
            });
            return !!check;
        });
    }
    /**
     *
     * @param {*} password string
     * @param {*} username string
     *
     * @description compare client's password to database user's password, if match then the user is valid
     * @returns Boolean
     */
    comparePassword(password, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield this.prisma.user.findFirst({
                    where: {
                        username: username,
                    },
                });
                let isPasswordMatch = false;
                if (userData) {
                    isPasswordMatch = bcrypt_1.default.compareSync(password, userData.password);
                }
                return isPasswordMatch;
            }
            catch (error) {
                throw new Error(JSON.stringify(error));
            }
        });
    }
    /**
     *
     * @param {*} res Reponse
     * @param {*} user { password: string , email: string }
     * @description Service to User to Login, checks if data the user's input is valid or not
     * @returns JwtToken | if email not found return json { message : "Email not found" } | if email is valid but the password is incorrect return json { message : "password is incorrect, try again" }
     */
    login(res, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, username } = user;
            try {
                const validateUser = yield this.validateUser(user);
                if (!validateUser) {
                    this.customResponse.setError(401, 'User not found');
                    this.customResponse.send(res);
                    return;
                }
                const isPasswordMatch = yield this.comparePassword(password, username);
                if (isPasswordMatch) {
                    const userData = yield this.prisma.user.findFirst({
                        where: {
                            username: username,
                        },
                    });
                    if (userData === null || userData === void 0 ? void 0 : userData.id) {
                        const token = yield this.generateToken(Object.assign({}, userData));
                        this.customResponse.setSuccess(201, 'Login Successful', { token });
                        return this.customResponse.send(res);
                    }
                }
                else {
                    this.customResponse.setError(401, 'password is incorrect, please try again');
                    return this.customResponse.send(res);
                }
            }
            catch (error) {
                this.customResponse.setError(400, JSON.stringify(error));
                return this.customResponse.send(res);
            }
        });
    }
    /**
     *
     * @param {*} body { email: string, password: string }
     * @description to validate user, literally using the other method ( checkEmailIfExist )
     * @returns Boolean
     */
    validateUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = body;
            const isEmailValid = yield this.checkIfUsernameExist(username);
            return isEmailValid;
        });
    }
}
exports.default = AuthService;
