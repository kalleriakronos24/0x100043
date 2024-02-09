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
class BookController extends service_1.default {
    constructor() {
        super();
    }
    retrievePaginatedBooks(req, res) {
        const _super = Object.create(null, {
            bookService: { get: () => super.bookService }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const params = req.query;
            const book = _super.bookService.call(this);
            if (params === null || params === void 0 ? void 0 : params.step) {
                const step = parseInt(params.step);
                return yield book.retrieveBookPaginated(step, res, params.search);
            }
            else {
                return res.status(403).json({
                    message: 'Unknown Params',
                });
            }
        });
    }
}
exports.default = BookController;
