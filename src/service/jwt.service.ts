import { sign, decode } from 'jsonwebtoken';
import 'dotenv';
import { User } from '@prisma/client';
import { Request, Response } from 'express';

class JwtService {
  constructor() {}

  /**
   *
   * @param {*} user User
   * @description sign the user to get the JwtToken
   * @returns JwtToken
   */
  signInToken(user: User) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is empty');
    }

    const token = sign(user, jwtSecret, { expiresIn: '360d' });
    return token;
  }

  retrieveUserInformation(req: Request, res: Response) {
    const header = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) {
      return res.sendStatus(401);
    }

    const decodeUser = decode(token);

    return decodeUser as User;
  }
}

export default JwtService;
