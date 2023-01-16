import { NextFunction, Request, Response } from "express";
import AdminService from "../service/admin.service";
import { AddAdminDto, AdminLoginDto, BlockAdminDto, ChangePasswordDto, DeleteTemplateDto } from "../dto/admin.dto";
import HttpResponse from "../response/HttpResponse";
import JwtToken from "../utils/token";
import FileHandler from "../utils/fileHandler";
import MailOptions from "../utils/mailOptions";
import Mail from "../utils/mail";
import { JwtPayload } from "jsonwebtoken";
import { IAdmin } from "../interface";
import HttpException from "../exceptions/HttpException";

class AdminController {
    private service = new AdminService();
    private jwt = new JwtToken()
    private mail = new Mail();
    private fileHandler = new FileHandler()

    addAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: AddAdminDto = req.body
            const superAdmin: IAdmin & Document = req["admin"]
            const { email, username } = data
            const verificationToken = this.jwt.signJwt(email, "1000s");
            const emailTemplate = await this.fileHandler.templateReader(`verifyMail.hbs`, { username, link: verificationToken })
            const newAdmin = await this.service.addAdmin(superAdmin.username, data)
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
    block = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: BlockAdminDto = req.body
            const isBlocked = await this.service.block(data)
            if (isBlocked)
                return res.status(200).send(new HttpResponse("success", "admin blocked"))
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }
    unblock = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: BlockAdminDto = req.body
            const isBlocked = await this.service.unblock(data)
            if (isBlocked)
                return res.status(200).send(new HttpResponse("success", "admin unblocked"))
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }
    addMailTemplate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.file) throw new HttpException(400, "file is required")
            const { filename, path, originalname } = req.file as Express.Multer.File
            const { username } = req["admin"] as IAdmin
            await this.service.addTemplate({ name: originalname, filename, path, addedBy: username })
            return res.status(200).send(new HttpResponse("success", "email template added", filename))
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }
    deleteMailTemplate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body as DeleteTemplateDto
            await this.service.deleteTemplate(data)
            return res.status(200).send(new HttpResponse("success", "email template deleted"))
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }
}

export default AdminController