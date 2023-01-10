import { AddAdminDto, ChangePasswordDto } from "../../dto/admin.dto";
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
}

export default IAdminService;