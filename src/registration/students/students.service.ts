import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentsDto } from './dto/students.dto';
import { Student, StudentDocument } from './schemas/students.schema';
import  bcrypt from "bcryptjs";

@Injectable()
export class StudentsService {
    constructor ( @InjectModel(Student.name) private studentModel: Model <StudentDocument>){}

    async getAll(): Promise<Student[]>{
        return  this.studentModel.find().exec()
    }
    async createStudent(studentsDto:StudentsDto): Promise<Student>{
        let newStudent = new this.studentModel(studentsDto);
        
        if (await this.studentModel.findOne({ name: studentsDto.name })) {
            throw 'Username "' + studentsDto.name + '" is already taken';
        }
    
    
        // hash password
        if (studentsDto.password) {
            newStudent = bcrypt.hashSync(studentsDto.password, 10);
        }
    
        // save user
        return newStudent.save()
    }

}
