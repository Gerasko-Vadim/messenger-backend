import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
    @Prop()
    name: string;

    @Prop()
    surname: string;

    @Prop()
    email: string;

    @Prop()
    course: string;

    @Prop()
    password: string;

    @Prop()
    repeat_password: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);