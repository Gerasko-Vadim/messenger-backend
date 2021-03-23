import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { isActive } from "../enums/isActive.enum";

export type StudentDocument = Student & Document;

@Schema()
export class Student {
    @Prop({type: String, required: true})
    name: string;

    @Prop({ type: String, required: true })
    surname: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    group: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, enum: Object.values(isActive), default: isActive.pending })
    isActive: string;

    @Prop({ type: String, default: null })
    avatar: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);

