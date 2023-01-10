import { BlockDto, CreateAccountDto, LoginDto, UnblockDto, UpdateInfoDto, VerifyDto } from "../../dto/user.dto";
import IUser from "../model/user.model.interface";

// get all user
// create account
// login
// verify
// change password
// update info
// block user
// unblock user
interface IUserService {
    getAllAccount(): Promise<IUser[]>;
    createAccount(newUser: CreateAccountDto): Promise<CreateAccountDto>;
    loginAccount(credentials: LoginDto): Promise<IUser>
    verify(email: string): Promise<Boolean>
    updateInfo(id: string, userInfo: UpdateInfoDto): Promise<IUser>
    block(user:BlockDto):Promise<boolean>
    unblock(user:UnblockDto):Promise<boolean>
}
export default IUserService;