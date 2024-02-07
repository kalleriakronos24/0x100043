// imports
import JwtService from './jwt.service';
import bcrypt from 'bcrypt';
import CustomResponse from '../util/custom-response.util';
import { PrismaClient, User } from '@prisma/client';
import { Response } from 'express';

class AuthService {
  customResponse = new CustomResponse();
  jwt = new JwtService();
  prisma = new PrismaClient();
  constructor() {}

  /**
   *
   * @param {*} user Users
   * @description generate token jwt, this only triggers if all the validation is meet the conditions
   * @returns JwtToken1
   */
  async generateToken(user: User) {
    const token = this.jwt.signInToken(user);

    return token;
  }

  /**
   *
   * @param {*} password string
   * @description Password Hashing using bcrypt
   * @returns hashedPassword with length 10
   */
  async hashPassword(password: string) {
    const hashPassword = bcrypt.hashSync(password, 10);
    return hashPassword;
  }

  /**
   *
   * @param {*} response Response
   * @param {*} user { email: string , password: string }
   * @async userRegister
   * @description Service to Register user to the Database
   * @returns Users { id: number, fullname: string, username: string, wallet: number }
   */
  async userRegister(response: Response, user: User) {
    const { username, password } = user;

    const usernameCheck = await this.checkIfUsernameExist(username);

    if (usernameCheck) {
      this.customResponse.setError(
        401,
        'Username has been used, please use another username',
      );
      return this.customResponse.send(response);
    }

    const hashPassword = await this.hashPassword(password);

    const newUser = await this.prisma.user.create({
      data: {
        ...user,
        password: hashPassword,
      },
    });

    // generate token
    // const token = await this.generateToken({ ...newUser});

    this.customResponse.setSuccess(201, 'User Created!', newUser);

    return this.customResponse.send(response);
  }

  /**
   *
   * @param {*} username string
   * @description username validation, check username if exists
   * @returns Null | Users
   */
  async checkIfUsernameExist(username: string) {
    const check = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    return !check;
  }

  /**
   *
   * @param {*} password string
   * @param {*} username string
   *
   * @description compare client's password to database user's password, if match then the user is valid
   * @returns Boolean
   */
  async comparePassword(password: string, username: string) {
    const userData = await this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    let isPasswordMatch;

    if (userData) {
      isPasswordMatch = bcrypt.compareSync(password, userData.password);
    }

    return isPasswordMatch;
  }

  /**
   *
   * @param {*} res Reponse
   * @param {*} user { password: string , email: string }
   * @description Service to User to Login, checks if data the user's input is valid or not
   * @returns JwtToken | if email not found return json { message : "Email not found" } | if email is valid but the password is incorrect return json { message : "password is incorrect, try again" }
   */
  async login(res: Response, user: User) {
    const { password, username } = user;

    try {
      const validateUser = await this.validateUser(user);

      if (!validateUser) {
        this.customResponse.setError(401, 'User not found');
        this.customResponse.send(res);
        return;
      }

      const isPasswordMatch = await this.comparePassword(password, username);

      if (isPasswordMatch) {
        const userData = await this.prisma.user.findFirst({
          where: {
            username: username,
          },
        });

        if (userData) {
          const token = await this.generateToken({ ...userData });

          this.customResponse.setSuccess(201, 'Login Successful', { token });
          return this.customResponse.send(res);
        }
      } else {
        this.customResponse.setError(
          401,
          'password is incorrect, please try again',
        );
        return this.customResponse.send(res);
      }
    } catch (error) {
      this.customResponse.setError(400, JSON.stringify(error));
      return this.customResponse.send(res);
    }
  }

  /**
   *
   * @param {*} body { email: string, password: string }
   * @description to validate user, literally using the other method ( checkEmailIfExist )
   * @returns Boolean
   */
  async validateUser(body: User) {
    const { username } = body;

    const isEmailValid = await this.checkIfUsernameExist(username);

    return isEmailValid;
  }
}

export default AuthService;
