import AdminController from "../controller/admin.controller";
import { IRoute } from "../interface";
import { Router } from "express";
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
            this.controller.addAdmin
        )
        this.route.post(
            `${this.path}/password`,
            this.controller.changePassword
        )
        this.route.post(
            `${this.path}/login`,
            this.controller.login
        )
    }
}

export default AdminRoute