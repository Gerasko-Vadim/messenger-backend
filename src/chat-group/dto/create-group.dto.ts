import { ApiProperty } from "@nestjs/swagger";
import { isNotEmpty, IsString } from "class-validator";

export class CreateChatGroupDto {
    @IsString()
    createUserId: string;

    @IsString()
    nameRoom: string
    
    @IsString()
    group: string;

    @IsString()
    roomId: string;
}