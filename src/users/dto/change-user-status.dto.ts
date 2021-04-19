import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import {isActive} from "../enums/isActive.enum"


export class ChangeUser{
    @IsNotEmpty()
    @IsString()
    readonly id: string 

    @IsNotEmpty()
    @IsEnum(isActive)
    readonly isActive: string
}