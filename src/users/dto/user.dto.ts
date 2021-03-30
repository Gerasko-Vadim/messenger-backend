import { IsEmail, IsString } from "class-validator"

export class UsersDto{
    @IsString()
    readonly name: string

    @IsString()
    readonly patronymic: string

    @IsString()
    readonly surname: string

    @IsString()
    @IsEmail()
    readonly email: string

    readonly group: string
    
    readonly isActive: Array<string>
    readonly role:Array<string>

    @IsString()
    readonly password: string
}