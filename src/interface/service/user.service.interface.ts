import { CreateAccountDto, LoginDto, UpdateInfoDto } from "../../dto/user.dto";
import IUser from "../model/user.model.interface";

// get all user
// create account
// login
// verify
// change password
// update info
interface IUserService {
    getAllAccount(): Promise<IUser[]>;
    createAccount(newUser: CreateAccountDto): Promise<CreateAccountDto>;
    loginAccount(credentials: LoginDto): Promise<IUser>
    verify(value: string): Promise<Boolean>
    updateInfo(id: string, userInfo: UpdateInfoDto): Promise<IUser>
}

export default IUserService;