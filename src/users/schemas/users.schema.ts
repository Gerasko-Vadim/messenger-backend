import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from 'mongoose';
import { isActive } from "../enums/isActive.enum";

export type UsersDocument = Users & Document;

@Schema()
export class Users {
    @Prop({type: String, required: true})
    @ApiProperty()
    name: string;

    @Prop({type:String, required:true})
    @ApiProperty()
    patronymic: string
    
    @Prop({ type: String, required: true })
    @ApiProperty()
    surname: string;

    @Prop({ type: String, required: true })
    @ApiProperty()
    email: string;

    @Prop({ type: String, required: false })
     @ApiProperty()
    group: string;

    @Prop({ type: String, required: true })
    @ApiProperty()
    password: string;

    @Prop({ type: String, enum: Object.values(isActive), default: isActive.active })
    @ApiProperty()
    isActive: string;

    @Prop({ type: String, default: null })
    @ApiProperty()
    avatar: string;
    @Prop({type: String})
    @ApiProperty()
    role: string
}

export const UsersSchema = SchemaFactory.createForClass(Users);

