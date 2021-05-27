import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from 'mongoose';


export type NewDocument = New & Document;

@Schema()
export class New {
    @Prop({type: String, required: false})
    avatar: string | null;

    @Prop({type: String, required: true, default: new Date})
    createDate: Date

    @Prop({type: String, required: true})
    name: string ;

    @Prop({type: String, required: true})
    surname: string ;

    @Prop({type: String, required: true})
    patronymic: string ;

    @Prop({type: String, required: true})
    title: string ;

    @Prop({type: String, required: true})
    content: string ;

    @Prop({type: String, required: true})
    uId: string ;

}

export const NewSchema = SchemaFactory.createForClass(New);

