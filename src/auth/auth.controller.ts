import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { StudentsDto } from 'src/students/dto/students.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signUp')
    async signUp(@Body(ValidationPipe) createStudentDto: StudentsDto): Promise<StudentsDto> {
        return this.authService.signUp(createStudentDto);
    }

}
