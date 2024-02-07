import AuthController from "./auth.controller";

class Controller {
    constructor(){}

    authController(){
        return new AuthController();
    }
};

export default Controller;