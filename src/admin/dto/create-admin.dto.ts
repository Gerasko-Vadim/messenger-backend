
import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class CreateAdminDto{
    @IsString()
    @ApiProperty({type: String, description: 'email'})
    readonly email: string


    @ApiProperty({type: String, description: 'password'})
    @IsString()
    readonly password: string

}