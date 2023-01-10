import { NextFunction, Request, Response } from "express";
import AdminService from "../service/admin.service";
import { AddAdminDto, AdminLoginDto, ChangePasswordDto } from "../dto/admin.dto";
import HttpResponse from "../response/HttpResponse";
import JwtToken from "../utils/token";
import { templateReader } from "../utils/templateReader";
import MailOptions from "../utils/mailOptions";
import Mail from "../utils/mail";
import { JwtPayload } from "jsonwebtoken";

class AdminController {
    private service = new AdminService();
    private jwt = new JwtToken()
    private mail = new Mail();
    addAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: AddAdminDto = req.body
            const { email, username } = data
            const verificationToken = this.jwt.signJwt(email, "1000s");
            const emailTemplate = await templateReader(`verifyMail.hbs`, { username, link: verificationToken })
            const newAdmin = await this.service.addAdmin("Jedi", data)
            if (newAdmin) {
                await this.mail.sendMail(new MailOptions(email, "verify account", emailTemplate))
                return res.status(200).send(new HttpResponse("success", "admin added"))
            }
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }
    changePassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newPassword: ChangePasswordDto = req.body
            const { value }: JwtPayload | string = this.jwt.verifyJwt(newPassword.token)
            newPassword.token = value
            const changedPassword = await this.service.changePassword(newPassword)
            if (changedPassword)
                return res.status(200).send(new HttpResponse("success", "password changed"))
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password }: AdminLoginDto = req.body
            const admin = await this.service.login({ password, email })
            if (admin) {
                const accessToken = this.jwt.signJwt(admin.username, "600s")
                const refreshToken = this.jwt.signJwt(admin.email, "30d")
                return res.status(200).send(new HttpResponse("success", "account authenticated", { accessToken, refreshToken }))
            }
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }
}

export default AdminController