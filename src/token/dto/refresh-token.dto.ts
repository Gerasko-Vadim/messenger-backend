import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"id users"})
    id:string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"user's old token"})
    old_token:string
}