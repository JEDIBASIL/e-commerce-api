import BaseAuth from "./base.auth";
import { NextFunction, Request, Response } from 'express';
import { Model, Document } from 'mongoose';
import { IUser } from "../interface";
import userModel from "../models/user.model";
import HttpException from "../exceptions/HttpException";

class UserAuth extends BaseAuth {
    private model: Model<Document<any, any, any> & IUser, {}, {}, {}, any>;
    constructor(req: Request, res: Response) {
        super(req, res)
        this.model = userModel
    }
    static async createInstance(req: Request, res: Response, next: NextFunction) {
        try {
            const auth = new UserAuth(req, res)
            const user = auth.isExist();
            req["user"] = user;
            return next()
        } catch (e) {
            next(e);
        }
    }
    async isExist() {
        const user = this.model.findOne({ username: this.value })
        if (!user) throw new HttpException(409, "account not found")
        return user
    }
}

export default UserAuth;