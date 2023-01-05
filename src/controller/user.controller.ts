import { NextFunction, Request, Response } from "express";
import UserService from "../service/user.service";
import HttpResponse from "../response/HttpResponse";
import HttpException from "../exceptions/HttpException";
import CreateAccountDto from "../dto/user.dto";
import Mail from "../utils/mail";
import MailOptions from "../utils/mailOptions";
import { templateReader } from "../utils/templateReader";
import JwtToken from "../utils/token";
import { JwtPayload } from "jsonwebtoken";
class UserController {

    private service = new UserService();
    private mail = new Mail();
    private jwt = new JwtToken();
    createAccount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: CreateAccountDto = req.body;
            const { email, username } = data
            if (data === undefined) throw new HttpException(400, "all fields are required")
            const verificationToken = await this.jwt.signJwt(email);
            const emailTemplate = await templateReader(`verifyMail.hbs`, { username, link: verificationToken })
            const newAccount = await this.service.createAccount(data);
            if (!newAccount) return res.status(500).send(new HttpResponse("failed", "an error occurred"))
            await this.mail.sendMail(new MailOptions(email, "verify account", emailTemplate))
            return res.status(200).send(new HttpResponse("success", "account created successfully"))
        } catch (err: unknown) {
            if (err instanceof Error) next(err)
        }
    }
    verify = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token } = req.body
            if (!token) throw new HttpException(400, "token is required")
            const verifiedToken:JwtPayload | string = await this.jwt.verifyJwt(token)
            const isVerifiedAccount = await this.service.verify(verifiedToken.value)
            if (isVerifiedAccount) 
            return res.status(200).send(new HttpResponse("success", "account verified successfully"))
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