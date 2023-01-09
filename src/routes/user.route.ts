import { Router } from "express";
import { IRoute } from "../interface";
import UserController from "../controller/user.controller";
import UserAuth from "../auth/user.auth";
import dtoValidationMiddleware from "../middleware/dto.validation.middleware";
import { CreateAccountDto, LoginDto, UpdateInfoDto, VerifyDto } from "../dto/user.dto";
import ErrorMessage from "../enums/error.message.enum";

class UserRoute implements IRoute {

    public path = "/user";
    public route = Router();
    private controller = new UserController();


    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.route.post(
            `${this.path}/create`,
            dtoValidationMiddleware(CreateAccountDto, "body", ErrorMessage.FIELDS),
            this.controller.createAccount
        )
        this.route.post(
            `${this.path}/verify`,
            dtoValidationMiddleware(VerifyDto, "body", ErrorMessage.TOKEN),
            this.controller.verify
        )
        this.route.post(
            `${this.path}/login`,
            dtoValidationMiddleware(LoginDto, "body", ErrorMessage.FIELDS),
            this.controller.login
        )

        this.route.post(
            `${this.path}/info`,
            dtoValidationMiddleware(UpdateInfoDto, "body", ErrorMessage.FIELDS),
            UserAuth.check,
            UserAuth.createInstance,
            this.controller.updateInfo
        )
        this.route.get(`${this.path}`, this.controller.getAllAccount)
    }
}

export default UserRoute