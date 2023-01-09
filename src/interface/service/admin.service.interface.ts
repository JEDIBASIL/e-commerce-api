import IAdmin from "../model/admin.model.interface";
// add admin
// block admin
// unblock admin
// get all admin
// delete admin
// change password

interface IAdminService{
    addAdmin():Promise<IAdmin>
}