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
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveUserPoints = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const retrieveUserPoints = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const check = yield prisma.user.findFirst({
        where: {
            id: id,
        },
    });
    if (check === null || check === void 0 ? void 0 : check.id) {
        return check.points;
    }
    return 0;
});
exports.retrieveUserPoints = retrieveUserPoints;
