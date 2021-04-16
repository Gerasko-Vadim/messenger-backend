import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, isNotEmpty, IsString } from "class-validator"

export class UsersDto{
    @IsString()
    @ApiProperty({type: String, description: 'Name'})
    readonly name: string

    @IsString()
    @ApiProperty({type: String, description: 'patronymic'})
    readonly patronymic: string

    @IsString()
    @ApiProperty({type: String, description: 'surname'})
    readonly surname: string

    @IsString()
    @IsEmail()
    @ApiProperty({type: String, description: 'email'})
    readonly email: string

    @ApiProperty({type: String, description: 'For the students'})
    readonly group: string
    
    readonly isActive: Array<string>
    readonly role:Array<string>

    @IsString()
    @ApiProperty({type: String, description: 'password'})
    readonly password: string
}