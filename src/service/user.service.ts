import CreateAccountDto from "../dto/user.dto";
import HttpException from "../exceptions/HttpException";
import { IUser, IUserService } from "../interface";
import userModel from "../models/user.model";

class UserService implements IUserService {
    private model = userModel;

    loginAccount(): Promise<IUser> {
        throw new Error("Method not implemented.");
    }

    async getAllAccount(): Promise<IUser[]> {
        const users = await this.model.find()
        return users
    }

    async createAccount(newUser: CreateAccountDto): Promise<CreateAccountDto> {
        const searchedEmail = await this.model.findOne({ email:newUser.email })
        const searchedUsername = await this.model.findOne({ username:newUser.username })
        if (searchedUsername) throw new HttpException(409, "username taken")
        if (searchedEmail) throw new HttpException(409, "email taken")
        const newAccount = await this.model.create({ ...newUser })
        return newAccount;
    }
}

export default UserService;