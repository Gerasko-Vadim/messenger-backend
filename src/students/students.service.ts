import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentsDto } from './dto/students.dto';
import { Student, StudentDocument } from './schemas/students.schema';
import * as bcrypt from 'bcrypt';
import { IStudent } from './interface/student.interface';
import * as _ from 'lodash';

@Injectable()
export class StudentsService {
    constructor ( @InjectModel(Student.name) private studentModel: Model <StudentDocument>){}

    async getAll(): Promise<Student[]>{
        return  this.studentModel.find().exec()
    }
    async createStudent(studentsDto:StudentsDto): Promise<IStudent>{
        let newStudent = new this.studentModel(studentsDto);
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(studentsDto.password, salt);
    
            const createdStudent = new this.studentModel(_.assignIn(studentsDto, { password: hash }));
            return await createdStudent.save();
        }
    
        async find(id: string): Promise<IStudent> {
            return await this.studentModel.findById(id).exec();
        }


}
