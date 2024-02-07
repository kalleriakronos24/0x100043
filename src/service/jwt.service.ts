import { sign } from 'jsonwebtoken';
import 'dotenv';
import { User } from '@prisma/client';

class JwtService {
    constructor() {
    }

    /**
     * 
     * @param {*} user User
     * @description sign the user to get the JwtToken
     * @returns JwtToken
     */
    signInToken(user: User) {
        const jwtSecret = process.env.JWT_SECRET;
        if(!jwtSecret) {
            throw new Error('JWT_SECRET is empty')
        };

        const token = sign(user, jwtSecret, { expiresIn : '360d' });
        return token;
    };

};


export default JwtService;