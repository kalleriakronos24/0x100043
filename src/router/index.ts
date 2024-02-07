import AuthRoutes from "./auth.route";

class Routes {
    constructor() {}
    route(){
        return [
            new AuthRoutes().route()
        ]
    };
};


export default Routes;