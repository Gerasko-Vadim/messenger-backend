import { ApiProperty } from "@nestjs/swagger";
import { isNotEmpty, IsString } from "class-validator";

export class CreateNewDto {
    @IsString()
    readonly uId: string

    @IsString()
    readonly title: string

    @IsString()
    readonly content: string

}