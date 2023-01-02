import { Router } from "express";
import { IRoute } from "../interface";
import UserController from "../controller/user.controller";

class UserRoute implements IRoute{

    public path =  "/user";
    public route = Router();
    private controller = new UserController();

    constructor(){
        this.initializeRoutes()
    }

    private initializeRoutes(){
        this.route.post(`${this.path}/create`,this.controller.createAccount)
        this.route.get(`${this.path}/create`,this.controller.getAllAccount)
    }
}

export default UserRoute