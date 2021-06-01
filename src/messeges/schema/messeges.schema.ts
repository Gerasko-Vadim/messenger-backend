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

    @Prop({type:String, required:true})
    roomId: string
    
    @Prop({ type: String, required: true })
    group: string;

    @Prop({type: Array , required: true})
    messeges:[{

        createdTime: {type: Date}
        author: {type: mongoose.Types.ObjectId , ref: "User"} 
        messege: string
    }]

}

export const MessegesSchema = SchemaFactory.createForClass(Messeges);

