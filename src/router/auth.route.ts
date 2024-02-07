import { Router } from 'express';
import Controller from '../controller';


class AuthRoutes extends Controller {
    router: Router
    constructor(){
        super();
        this.router = Router();
    }
    route(){
        return [
            this.router.post('/auth/sign-up', super.authController().userRegister),
            this.router.post('/auth/sign-in', super.authController().userLogin),
            this.router.get('/auth/test', (req,res) => {
                res.send('Hello i am a robot');
            })
        ]
    }
};


export default AuthRoutes;