import AdminRoles from "../../enums/admin.enum";
import Status from "../../enums/status.enum";

interface IAdmin{
    username:string;
    email:string;
    password:string;
    role:AdminRoles
    addedAt:Date;
    status:Status;
    addedBy:string;
    isVerified:boolean;
    isPasswordMatch:(password:string) => boolean 
}

export default IAdmin