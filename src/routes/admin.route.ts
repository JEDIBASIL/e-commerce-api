import AdminController from "../controller/admin.controller";
import { IRoute } from "../interface";
import { Router } from "express";
import dtoValidationMiddleware from "../middleware/dto.validation.middleware";
import { AddAdminDto, AdminLoginDto, BlockAdminDto, ChangePasswordDto } from "../dto/admin.dto";
import ErrorMessage from "../enums/error.message.enum";
import AdminAuth from "../auth/admin.auth";
import MulterUpload from "../middleware/multer.middleware";
import { AddTemplateDto } from "../dto/template.dto";
class AdminRoute implements IRoute {
    path: string = "/admin";
    route: Router = Router();
    private controller = new AdminController()
    constructor() {
        this.initializeRoute()
    }
    private initializeRoute() {
        this.route.post(
            `${this.path}`,
            dtoValidationMiddleware(AddAdminDto, "body", ErrorMessage.FIELDS),
            AdminAuth.check,
            AdminAuth.isSuper,
            this.controller.addAdmin
        )
        this.route.post(
            `${this.path}/password`,
            dtoValidationMiddleware(ChangePasswordDto, "body", ErrorMessage.FIELDS),
            this.controller.changePassword
        )
        this.route.post(
            `${this.path}/login`,
            dtoValidationMiddleware(AdminLoginDto, "body", ErrorMessage.FIELDS),
            this.controller.login
        )
        this.route.post(
            `${this.path}/block`,
            dtoValidationMiddleware(BlockAdminDto, "body", ErrorMessage.FIELDS),
            AdminAuth.check,
            AdminAuth.isSuper,
            this.controller.block
        )
        this.route.post(
            `${this.path}/unblock`,
            dtoValidationMiddleware(BlockAdminDto, "body", ErrorMessage.FIELDS),
            AdminAuth.check,
            AdminAuth.isSuper,
            this.controller.unblock
        )
        this.route.post(
            `${this.path}/template`,
            AdminAuth.check,
            AdminAuth.isSub,
            new MulterUpload("templates").upload().single("template"),
            dtoValidationMiddleware(AddTemplateDto, "body", ErrorMessage.FIELDS),
            this.controller.addMailTemplate
        )
    }
}

export default AdminRoute