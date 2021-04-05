import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { isActive } from "../enums/isActive.enum";

export type UsersDocument = Users & Document;

@Schema()
export class Users {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type:String, required:true})
    patronymic: string
    
    @Prop({ type: String, required: true })
    surname: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: false })
    group: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String, enum: Object.values(isActive), default: isActive.active })
    isActive: string;

    @Prop({ type: String, default: null })
    avatar: string;
    @Prop({type: String})
    role: string
}

export const UsersSchema = SchemaFactory.createForClass(Users);

