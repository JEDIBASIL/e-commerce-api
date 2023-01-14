import { AddAdminDto, AdminLoginDto, ChangePasswordDto, BlockAdminDto, DeleteTemplateDto } from "../dto/admin.dto";
import Status from "../enums/status.enum";
import HttpException from "../exceptions/HttpException";
import { IAdmin, IAdminService, ITemplate } from "../interface";
import adminModel from "../models/admin.model";
import templateModel from "../models/template.model";

class AdminService implements IAdminService {
    private modelA = adminModel
    private modelT = templateModel
    async addAdmin(superAdmin: string, newAdmin: AddAdminDto): Promise<IAdmin> {
        const { email, username } = newAdmin
        const findByEmail = await this.modelA.findOne({ email })
        const findByUsername = await this.modelA.findOne({ username })
        if (findByEmail) throw new HttpException(409, "email taken")
        if (findByUsername) throw new HttpException(409, "username taken")
        const admin = await this.modelA.create({ ...newAdmin, addedBy: superAdmin });
        return admin;
    }
    async changePassword(newPassword: ChangePasswordDto): Promise<IAdmin> {
        const admin = await this.modelA.findOne({ email: newPassword.token })
        if (!admin) throw new HttpException(404, "account not found")
        if (newPassword.confirmPassword !== newPassword.password) throw new HttpException(400, "password do not match")
        admin.isVerified = true;
        admin.password = newPassword.password
        admin.save()
        return admin
    }
    async login(credentials: AdminLoginDto): Promise<IAdmin> {
        const { email, password } = credentials
        const findByEmail = await this.modelA.findOne({ email })
        if (!findByEmail) throw new HttpException(400, "incorrect email or password")
        if (!findByEmail.isVerified) throw new HttpException(400, "account not verified")
        if (findByEmail.status === Status.BLOCKED) throw new HttpException(400, "account blocked")
        if (!findByEmail.isPasswordMatch(password)) throw new HttpException(400, "incorrect email or password")
        return findByEmail
    }
    async block(admin: BlockAdminDto): Promise<boolean> {
        const { email } = admin
        const account = await this.modelA.findOne({ email })
        if (!account) throw new HttpException(404, "admin not found")
        account.status = Status.BLOCKED
        account.save();
        return true;
    }
    async unblock(admin: BlockAdminDto): Promise<boolean> {
        const { email } = admin
        const account = await this.modelA.findOne({ email })
        if (!account) throw new HttpException(404, "admin not found")
        account.status = Status.UNBLOCKED
        account.save();
        return true;
    }
    async addTemplate(template: ITemplate): Promise<boolean> {
        const findTemplateByName = await this.modelT.findOne({ name: template.name })
        if (findTemplateByName) throw new HttpException(409, "template with this name already exist")
        const newTemplate = await this.modelT.create(template)
        if (!newTemplate) throw new HttpException(500, "an error occurred")
        return true
    }
    async deleteTemplate(template: DeleteTemplateDto): Promise<boolean> {
        const { filename } = template
        const foundTemplate = await this.modelT.findOne({ filename })
        if(!foundTemplate)  throw new HttpException(404, "template not found")
    }
}

export default AdminService