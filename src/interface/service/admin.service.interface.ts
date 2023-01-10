import { AddAdminDto, AdminLoginDto, BlockAdmin as BlockAdminDto, ChangePasswordDto } from "../../dto/admin.dto";
import IAdmin from "../model/admin.model.interface";
// add admin
// block admin
// unblock admin
// get all admin
// delete admin
// change password

interface IAdminService {
    addAdmin(superAdmin: string, newAdmin: AddAdminDto): Promise<IAdmin>
    changePassword(newPassword: ChangePasswordDto): Promise<IAdmin>
    login(credentials:AdminLoginDto) : Promise<IAdmin>
    block(admin:BlockAdminDto):Promise<boolean>
}

export default IAdminService;