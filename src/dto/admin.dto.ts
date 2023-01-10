import { Trim } from "class-sanitizer";
import { IsEmail, IsString, MinLength } from "class-validator";
import AdminRoles from "../enums/admin.enum";

class AddAdminDto {
    @IsString()
    @Trim()
    @MinLength(3, { message: "username should be minimum of 3 characters" })
    public username!: string;
    @IsEmail()
    @Trim()
    public email!: string;
    @IsString()
    public role!: AdminRoles
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