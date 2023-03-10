import { BlockDto, CreateAccountDto, LoginDto, UnblockDto, UpdateInfoDto } from "../dto/user.dto";
import Status from "../enums/status.enum";
import HttpException from "../exceptions/HttpException";
import { IUser, IUserService } from "../interface";
import userModel from "../models/user.model";

class UserService implements IUserService {

    private model = userModel;

    async getAllAccount(): Promise<IUser[]> {
        const users = await this.model.find()
        return users
    }
    async createAccount(newUser: CreateAccountDto): Promise<CreateAccountDto> {
        const searchedEmail = await this.model.findOne({ email: newUser.email })
        const searchedUsername = await this.model.findOne({ username: newUser.username })
        if (searchedUsername) throw new HttpException(409, "username taken")
        if (searchedEmail) throw new HttpException(409, "email taken")
        const newAccount = await this.model.create({ ...newUser })
        return newAccount;
    }
    async verify(email: string): Promise<Boolean> {
        const account = await this.model.findOne({ email })
        if (!account) throw new HttpException(400, "invalid token")
        if (account.isVerified) throw new HttpException(200, "user is already verified")
        account.isVerified = true;
        account.save();
        return true;
    }

    async loginAccount(credentials: LoginDto): Promise<IUser> {
        const { password, usernameOrEmail } = credentials
        const findByUsernameOrEmail = await this.model.findOne({ $or: [{ "username": usernameOrEmail }, { "email": usernameOrEmail }] }).select("+password")
        if (!findByUsernameOrEmail) throw new HttpException(404, "incorrect username or email, and password")
        if (!findByUsernameOrEmail.isPasswordMatch(password)) throw new HttpException(404, "incorrect username or email, and password")
        if (!findByUsernameOrEmail.isVerified) throw new HttpException(403, "account is not verified")
        if (findByUsernameOrEmail.status === Status.BLOCKED) throw new HttpException(401, "account blocked")
        return findByUsernameOrEmail;
    }
    async updateInfo(id: string, userInfo: UpdateInfoDto): Promise<IUser> {
        const { firstName, lastName } = userInfo
        const updateAccount = await this.model.findOne({ _id: id })
        updateAccount!.firstName = firstName
        updateAccount!.lastName = lastName
        await updateAccount?.save()
        return updateAccount as IUser;
    }
    async block(user: BlockDto): Promise<boolean> {
        const { email } = user
        const account = await this.model.findOne({ email })
        if (!account) throw new HttpException(404, "account not found")
        account.status = Status.BLOCKED
        account.save()
        return true
    }
    async unblock(user: UnblockDto): Promise<boolean> {
        const { email } = user
        const account = await this.model.findOne({ email })
        if (!account) throw new HttpException(404, "account not found")
        account.status = Status.UNBLOCKED
        account.save()
        return true
    }
}

export default UserService;