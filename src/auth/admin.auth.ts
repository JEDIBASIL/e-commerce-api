import { Model, Document } from "mongoose";
import HttpException from "../exceptions/HttpException";
import BaseAuth from "./base.auth";
import { NextFunction, Request, Response } from 'express';
import adminModel from "../models/admin.model";
import { IAdmin } from "../interface";
import AdminRoles from "../enums/admin.enum";

class AdminAuth extends BaseAuth {
    private model: Model<Document<any, any, any> & IAdmin, {}, {}, {}, any>;
    constructor(req: Request, res: Response) {
        super(req, res)
        this.model = adminModel;
    }
    static async createInstance(req: Request, res: Response, next: NextFunction) {
        try {
            const admin = await new AdminAuth(req, res).isExist();
            req["admin"] = admin;
            return next()
        } catch (e) {
            next(e);
        }
    }
    static async isSuper(req: Request, res: Response, next: NextFunction) {
        try {
            const admin = await new AdminAuth(req, res).isExist();
            if (admin.role !== AdminRoles.SUPER) throw new HttpException(401, "not a super admin")
            req["admin"] = admin;
            return next()
        } catch (e) {
            next(e);
        }
    }
    async isExist() {
        const admin = await this.model.findOne({ username: this.value })
        if (!admin) throw new HttpException(409, "account not found")
        return admin
    }

}

export default AdminAuth