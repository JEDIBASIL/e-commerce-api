import { NextFunction, Request, Response, Router } from "express";
import UserService from "../service/user.service";
import HttpResponse from "../response/HttpResponse";
import HttpException from "../exceptions/HttpException";
import CreateAccountDto from "../dto/user.dto";

class UserController {

    private service = new UserService();

    createAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: CreateAccountDto = req.body;
            if (data === undefined) throw new HttpException(400, "all fields are required")
            const newAccount = await this.service.createAccount(data);
            if (!newAccount) return res.status(500).send(new HttpResponse("failed", "an error occurred"))
            return res.status(200).send(new HttpResponse("success", "account created successfully"))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }

    getAllAccount = async (req: Request, res: Response, next: NextFunction) => {
        const data = await this.service.getAllAccount();
        return res.status(200).send(new HttpResponse("success", "fetched all the users", data))
    }
}

export default UserController;