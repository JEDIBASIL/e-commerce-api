import { IRoute, NextFunction, Request, Response, Router } from "express";
import { IUser } from "../interface";
import UserService from "../service/user.service";
import HttpResponse from "../response/HttpResponse";
import { IRouterHandler } from "express-serve-static-core";

class UserController {

    private service = new UserService();
    async createAccount(req: Request, res: Response, next: NextFunction) {
        const data: IUser = req.body;
        const newAccount = await this.service.createAccount(data);
        if (!newAccount) return res.status(500).send(new HttpResponse("failed", "an error occurred"))
        return res.status(200).send(new HttpResponse("success", "account created successfully"))
    }

    async getAllAccount(req: Request, res: Response, next: NextFunction) {
        return res.status(200).send({ data: this.service.getAllAccount() })
    }
}

export default UserController;