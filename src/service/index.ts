import AuthService from './auth.service';

class Service {    
    authService() {
        return new AuthService();
    };
};

export default Service;