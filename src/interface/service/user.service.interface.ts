import CreateAccountDto from "../../dto/user.dto";
import IUser from "../model/user.model.interface";

interface IUserService{
    getAllAccount():Promise<IUser[]>;
    createAccount(newUser:CreateAccountDto): Promise<CreateAccountDto>;
    loginAccount():Promise<IUser>
}

export default IUserService;