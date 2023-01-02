interface IUser {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isVerified: boolean;
    status: boolean;
    joinedAt: Date
}

export default IUser