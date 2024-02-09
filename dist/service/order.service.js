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
const custom_response_util_1 = __importDefault(require("../util/custom-response.util"));
const client_1 = require("@prisma/client");
const user_repository_1 = require("../repository/user.repository");
class OrderService {
    constructor() {
        this.customResponse = new custom_response_util_1.default();
        this.jwt = new jwt_service_1.default();
        this.prisma = new client_1.PrismaClient();
    }
    checkoutOrder(req, res, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (payload.length <= 0) {
                        this.customResponse.setError(403, 'Cart cannot be empty');
                        return this.customResponse.send(res);
                    }
                    const retrieveUser = this.jwt.retrieveUserInformation(req, res);
                    if (!(retrieveUser === null || retrieveUser === void 0 ? void 0 : retrieveUser.id)) {
                        this.customResponse.setError(401, 'User is not authenticated');
                        return this.customResponse.send(res);
                    }
                    const user = retrieveUser;
                    const cartAccumulate = payload.reduce((a, b) => a + b.price, 0);
                    const userPoints = yield (0, user_repository_1.retrieveUserPoints)(user.id);
                    if (cartAccumulate >= userPoints) {
                        this.customResponse.setError(403, `Cannot checkout order, order amount is exceeding your ${userPoints} points.`);
                        return this.customResponse.send(res);
                    }
                    const refNumber = 'INV-XXX/XX/XXXX/';
                    let totalPrice = 0;
                    for (const cart of payload) {
                        const queryPayload = {
                            referenceNumber: refNumber,
                            bookId: cart.id,
                            orderAt: new Date(),
                            orderBy: user.id,
                            status: client_1.OrderStatus.SUCCESS,
                        };
                        totalPrice += cart.price;
                        yield tx.order.create({
                            data: queryPayload,
                        });
                    }
                    yield tx.orderSummary.create({
                        data: {
                            referenceNumber: refNumber,
                            orderBy: user.id,
                            totalPrice: totalPrice,
                            checkoutAt: new Date(),
                        },
                    });
                    yield tx.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            points: userPoints - totalPrice,
                        },
                    });
                    this.customResponse.setSuccess(200, 'Checkout Success', {});
                    return this.customResponse.send(res);
                }
                catch (error) {
                    this.customResponse.setError(400, JSON.stringify(error));
                    return this.customResponse.send(res);
                }
            }));
        });
    }
}
exports.default = OrderService;
