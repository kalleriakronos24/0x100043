"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv");
class JwtService {
    constructor() { }
    /**
     *
     * @param {*} user User
     * @description sign the user to get the JwtToken
     * @returns JwtToken
     */
    signInToken(user) {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is empty');
        }
        const token = (0, jsonwebtoken_1.sign)(user, jwtSecret, { expiresIn: '360d' });
        return token;
    }
    retrieveUserInformation(req, res) {
        const header = req.headers['authorization'];
        const token = header && header.split(' ')[1];
        if (!token) {
            return res.sendStatus(401);
        }
        const decodeUser = (0, jsonwebtoken_1.decode)(token);
        return decodeUser;
    }
}
exports.default = JwtService;
