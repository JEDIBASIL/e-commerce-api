import { AddAdminDto } from "../dto/admin.dto";
import HttpException from "../exceptions/HttpException";
import { IAdmin, IAdminService } from "../interface";
import adminModel from "../models/admin.model";

class AdminService implements IAdminService {
    private modelA = adminModel
    async addAdmin(superAdmin: string, newAdmin: AddAdminDto): Promise<IAdmin> {
        const { email, username } = newAdmin
        const findByEmail = await this.modelA.findOne({ email })
        const findByUsername = await this.modelA.findOne({ username })
        if (findByEmail) throw new HttpException(409, "email taken")
        if (findByUsername) throw new HttpException(409, "username taken")
        const admin = await this.modelA.create({ ...newAdmin, addedBy: superAdmin });
        return admin;
    }
}

export default AdminService