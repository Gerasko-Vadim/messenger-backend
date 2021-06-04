import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from 'mongoose';
import * as mongoose from 'mongoose';


export type MessegesDocument = Messeges & Document;

@Schema()
export class ArrayMessage {
    @Prop( {type : Date , default : new Date()})
    createdTime : Date

    @Prop({type: mongoose.Types.ObjectId , ref: "User"})
    author: mongoose.Types.ObjectId

    @Prop({type: String})
    message: string
}

@Schema()
export class Messeges {
    @Prop({ type: String, required: true })
    createUserId: string;

    @Prop({ type: String, required: true })
    nameRoom: string

    @Prop({ required: true })
    roomId: string

    @Prop({ type: String, required: true })
    group: string;

    @Prop({ type: [ArrayMessage], required: true })
    messages: []

}




export const MessegesSchema = SchemaFactory.createForClass(Messeges);

