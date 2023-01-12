import { AddAdminDto, AdminLoginDto, BlockAdminDto, ChangePasswordDto, UnblockAdminDto } from "../../dto/admin.dto";
import { AddTemplateDto } from "../../dto/template.dto";
import IAdmin from "../model/admin.model.interface";
import ITemplate from "../model/template.model.interface";
// add admin
// block admin
// unblock admin
// get all admin
// delete admin
// change password
// added mail template
// delete mail template

interface IAdminService {
    addAdmin(superAdmin: string, newAdmin: AddAdminDto): Promise<IAdmin>
    changePassword(newPassword: ChangePasswordDto): Promise<IAdmin>
    login(credentials:AdminLoginDto) : Promise<IAdmin>
    block(admin:BlockAdminDto):Promise<boolean>
    unblock(admin:UnblockAdminDto):Promise<boolean>
    addTemplate(template:AddTemplateDto):Promise<boolean>
}

export default IAdminService;