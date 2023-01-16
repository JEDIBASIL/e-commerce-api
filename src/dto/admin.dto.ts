import { Trim } from "class-sanitizer";
import { IsEmail, IsObject, IsString, IsUUID, MinLength } from "class-validator";
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

class AdminLoginDto {
    @IsEmail()
    @Trim()
    public email!: string;
    @IsString()
    public password!: string
}

class ChangePasswordDto {
    @IsString()
    token!: string;
    @IsString()
    password!: string
    @IsString()
    confirmPassword!: string
}

class DeleteAdmin {
    @IsEmail()
    email!: string;
}

class BlockAdminDto {
    @IsEmail()
    email!: string;
}

class UnblockAdminDto {
    @IsEmail()
    email!: string;
}

class AddTemplateDto {
    @IsObject()
    template!: Express.Multer.File;
}

class DeleteTemplateDto {
    @IsString()
    filename!: string
}

export { AddAdminDto, ChangePasswordDto, DeleteAdmin, BlockAdminDto, UnblockAdminDto, AdminLoginDto, AddTemplateDto, DeleteTemplateDto }