import { Request, Response } from 'express';
import Service from '../service';

class AuthController extends Service {
    constructor(){
        super();
    };

    /**
     * 
     * @param {*} req Request
     * @param {*} res Response
     * @description registering a user to the database via endpoint /auth/sign-up with all the data provided by the client
     * @returns JwtToken if all the conditions meet
     */
    async userRegister(req: Request,res: Response) {

        const auth = super.authService();
        const body = req.body;

        return await auth.userRegister(res, body);

    };

    /**
     * 
     * @param {*} req Request
     * @param {*} res Response
     * @description login user to the server, if all the data is valid, gives a user JwtToken to access the frontend's application
     * @returns JwtToken if all the conditions meet
     */
    async userLogin(req: Request,res: Response) {

        const auth = super.authService();
        const body = req.body;

        return await auth.login(res, body);
        
    }
};


export default AuthController;