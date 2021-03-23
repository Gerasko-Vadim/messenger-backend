import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class ConfirmAccountDto {
    @IsNotEmpty()
    @ApiProperty()
    token: string;
}