import { NextFunction, Request, Response } from "express";
import AdminService from "../service/admin.service";
import { AddAdminDto } from "../dto/admin.dto";
import HttpResponse from "../response/HttpResponse";

class AdminController {
    private service = new AdminService();
    addAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: AddAdminDto = req.body
            const newAdmin = await this.service.addAdmin("Jedi", data)
            if (newAdmin)
                return res.status(200).send(new HttpResponse("success", "admin added"))
        } catch (err) {
            if (err instanceof Error) next(err)
        }
    }
}

export default AdminController