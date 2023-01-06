class CreateAccountDto {
    public username!: string;
    public email!: string;
    public password!: string;
}

class UpdateInfoDto {
    public firstName!: string;
    public lastName!: string;
}

class LoginDto {
    public usernameOrEmail!: string;
    public password!: string;
}


export { CreateAccountDto, LoginDto, UpdateInfoDto }