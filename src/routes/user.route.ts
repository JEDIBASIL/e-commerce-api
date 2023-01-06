import { Router } from "express";
import { IRoute } from "../interface";
import UserController from "../controller/user.controller";
import UserAuth from "../auth/user.auth";

class UserRoute implements IRoute{

    public path =  "/user";
    public route = Router();
    private controller = new UserController();
    

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.route.post(`${this.path}/create`,this.controller.createAccount)
        this.route.post(`${this.path}/verify`,this.controller.verify)
        this.route.post(`${this.path}/login`,this.controller.login)
        this.route.post(`${this.path}/info`,UserAuth.check,UserAuth.createInstance,this.controller.updateInfo)
        this.route.get(`${this.path}`,this.controller.getAllAccount)
    }
}

export default UserRoute