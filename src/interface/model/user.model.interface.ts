interface IUser {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isVerified: boolean;
    status: boolean;
    joinedAt: Date;
    isPasswordMatch:(password:string) => boolean 
}

export default IUser