import { Trim } from "class-sanitizer";
import { IsEmail, IsString, MinLength } from "class-validator";

class AddAdminDto {
    @IsString()
    @Trim()
    @MinLength(3, { message: "username should be minimum of 3 characters" })
    public username!: string;
    @IsEmail()
    @Trim()
    public email!: string;
}

class ChangePasswordDto {
    @IsString()
    token!: string;
    @IsEmail()
    email!: string
}

class DeleteAdmin {
    @IsEmail()
    email!: string;
}

class BlockAdmin {
    @IsEmail()
    email!: string;
}

class UnblockAdmin {
    @IsEmail()
    email!: string;
}

export { AddAdminDto, ChangePasswordDto, DeleteAdmin, BlockAdmin, UnblockAdmin }