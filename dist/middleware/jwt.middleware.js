"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv");
class JwtMiddleware {
    /**
     *
     * @param {*} req Request
     * @param {*} res Response
     * @param {*} next Next
     * @description endpoint guard to check if the someone who access this endpoint with this guard provided have JwtToken included in their Authorization header's, if the token is provided proceed to the next process ( next() )
     * @returns if no token returns res.status(401) | next() proceed to next process
     */
    authenticateToken(req, res, next) {
        const header = req.headers['authorization'];
        const token = header && header.split(' ')[1];
        if (!token) {
            return res.sendStatus(401);
        }
        if (process.env.JWT_SECRET) {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, data) => {
                if (err) {
                    return res.sendStatus(403);
                }
                next();
            });
        }
        else {
            return res.send('JWT_SECRET NOT FOUND').status(500);
        }
    }
}
exports.default = JwtMiddleware;
