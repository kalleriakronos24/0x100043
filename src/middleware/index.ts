import JwtMiddleware from './jwt.middleware';

class Middlewares {
    jwt() {
        return new JwtMiddleware()
    }
};


export default Middlewares;