import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentsDto } from './dto/students.dto';
import { IStudent } from './interface/student.interface';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {

}
