import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsFile } from "nestjs-form-data";

export class UpdateUser{
    @IsString()
    id:string

    @IsString()
    name: string

    @IsString()
    surname: string

    @IsString()
    patronymic: string

    @IsFile()
    @IsOptional()
    avatar
}