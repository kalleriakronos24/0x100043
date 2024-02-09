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
const prisma_pagination_1 = require("prisma-pagination");
class BookService {
    constructor() {
        this.customResponse = new custom_response_util_1.default();
        this.jwt = new jwt_service_1.default();
        this.prisma = new client_1.PrismaClient();
        this.paginate = (0, prisma_pagination_1.createPaginator)({ perPage: 20 });
    }
    /**
     *
     * @param {*} step number
     * @description get all paginated books, applies inifinite scrolling in the frontend
     * @returns Paginated Books
     */
    retrieveBookPaginated(step, res, search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield this.prisma.book.count({
                    where: {
                        createdAt: {
                            not: undefined,
                        },
                    },
                });
                let query = {
                    createdAt: {
                        not: undefined,
                    },
                };
                if (search) {
                    query = {
                        createdAt: {
                            not: undefined,
                        },
                        OR: [
                            { title: { contains: search, mode: 'insensitive' } },
                            { writer: { contains: search, mode: 'insensitive' } },
                        ],
                    };
                }
                let result = yield this.paginate(this.prisma.book, {
                    where: query,
                    orderBy: {
                        createdAt: 'desc',
                    },
                }, { page: 1, perPage: step });
                let output = {};
                if (step >= count) {
                    output = {
                        data: result.data,
                        meta: Object.assign(Object.assign({}, result.meta), { isExceed: true }),
                    };
                }
                else {
                    output = result;
                }
                this.customResponse.setSuccess(200, 'Retrieve success', Object.assign({}, output));
                return this.customResponse.send(res);
            }
            catch (error) {
                this.customResponse.setError(400, JSON.stringify(error));
                return this.customResponse.send(res);
            }
        });
    }
}
exports.default = BookService;
