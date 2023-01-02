import IUser from "../model/user.model.interface";

interface IUserService{
    getAllAccount():Promise<IUser[]>;
    createAccount(newUser:IUser):Promise<IUser>;
    loginAccount():Promise<IUser>
}

export default IUserService;