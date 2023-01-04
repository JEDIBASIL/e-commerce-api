import { NextFunction, Request, Response } from "express";
import UserService from "../service/user.service";
import HttpResponse from "../response/HttpResponse";
import HttpException from "../exceptions/HttpException";
import CreateAccountDto from "../dto/user.dto";
import Mail from "../utils/mail";
import MailOptions from "../utils/mailOptions";
import { templateReader } from "../utils/templateReader";
class UserController {

    private service = new UserService();
    private mail = new Mail();

    createAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: CreateAccountDto = req.body;
            if (data === undefined) throw new HttpException(400, "all fields are required")
            const newAccount = await this.service.createAccount(data);
            if (!newAccount) return res.status(500).send(new HttpResponse("failed", "an error occurred"))
            const emailTemplate = await templateReader(`verifyMail.hbs`, { username: data.username, link: data.email })
            await this.mail.sendMail(new MailOptions(data.email, "verify account", emailTemplate))
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