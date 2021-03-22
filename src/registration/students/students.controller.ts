import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentsDto } from './dto/students.dto';
import { Student } from './schemas/students.schema';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
    constructor( private readonly studentsService: StudentsService){}
    @Post()
    createStudents(@Body() studentsDto:StudentsDto): Promise<Student>{
        return this.studentsService.createStudent(studentsDto)
    }
}
