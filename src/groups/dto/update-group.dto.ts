import { IsEnum, IsString } from "class-validator";
import { status } from "../enum/status.enum";


export class UpdateGroupDto {
    @IsString()
    readonly id:string

    @IsEnum(status)
    readonly status: string
}


