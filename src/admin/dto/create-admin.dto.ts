
import { IsEmail, IsString } from "class-validator"

export class CreateAdminDto{
    @IsString()
    readonly email: string

    @IsString()
    readonly password: string
}