import { Trim } from "class-sanitizer"
import { IsString } from "class-validator"

class AddTemplateDto {
    @IsString()
    @Trim()
    name!: string
}

class DeleteTemplateDto {
    @IsString()
    @Trim()
    name!: string
}

export { AddTemplateDto, DeleteTemplateDto }