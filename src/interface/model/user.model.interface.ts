import Status from "../../enums/status.enum";

interface IUser {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isVerified: boolean;
    status: Status;
    joinedAt: Date;
    isPasswordMatch:(password:string) => boolean 
}

export default IUser