import { ApiProperty } from "@nestjs/swagger";
import { isNotEmpty, IsString } from "class-validator";

export class CreateGroupDto {
    @IsString()
    @ApiProperty({description: "name the group"})
    readonly group: string
}
