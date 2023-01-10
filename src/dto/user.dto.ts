import { Trim } from "class-sanitizer";
import { IsEmail, IsString, MinLength } from "class-validator";

class CreateAccountDto {
    @IsString()
    @Trim()
    @MinLength(3, { message: "username should be minimum of 3 characters" })
    public username!: string;
    @IsEmail()
    @Trim()
    public email!: string;
    @IsString()
    @MinLength(6, { message: "minimum character should be 6" })
    public password!: string;
}

class UpdateInfoDto {
    @IsString()
    @Trim()
    @MinLength(3, { message: "username should be minimum of 3 characters" })
    public firstName!: string;
    @IsString()
    @Trim()
    @MinLength(3, { message: "username should be minimum of 3 characters" })
    public lastName!: string;
}

class LoginDto {
    @IsString()
    @Trim()
    public usernameOrEmail!: string;
    @IsString()
    public password!: string;
}

class VerifyDto {
    @IsString()
    public token!: string;
}

class BlockDto {
    @IsEmail()
    email!: string;
}

class UnblockDto {
    @IsEmail()
    email!: string;
}


export { CreateAccountDto, LoginDto, UpdateInfoDto, VerifyDto, UnblockDto, BlockDto }