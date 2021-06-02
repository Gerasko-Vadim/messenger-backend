import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from 'mongoose';
import * as mongoose from 'mongoose';


export type MessegesDocument = Messeges & Document;

@Schema()
export class Messeges {
    @Prop({type: String, required: true})
    createUserId: string;

    @Prop({type:String, required:true})
    nameRoom: string

    @Prop({required:true})
    roomId:  string
    
    @Prop({ type: String, required: true })
    group: string;

    @Prop({type: Array , required: true})
    messages:[{

        createdTime: Date
        author: {type: string | any , ref: "User"} 
        message: string
    }]

}


export const MessegesSchema = SchemaFactory.createForClass(Messeges);

