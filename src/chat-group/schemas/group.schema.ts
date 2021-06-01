import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from 'mongoose';


export type ChatGroupDocument = ChatGroup & Document;

@Schema()
export class ChatGroup {
    @Prop({type: String, required: true})
    createUserId: string;

    @Prop({type:String, required:true})
    nameRoom: string
    
    @Prop({ type: String, required: true })
    group: string;

}

export const ChatGroupSchema = SchemaFactory.createForClass(ChatGroup);

