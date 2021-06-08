import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type MessagesDocument = Messeges & Document

@Schema()
export class ArrayMessage extends Document {
    @Prop({ type: Date, default: new Date(), required: false })
    createdTime: Date

    @Prop({ type: mongoose.Types.ObjectId, ref: "Users" })
    author: mongoose.Types.ObjectId

    @Prop({ type: String })
    message: string
}
export const ArrayMessegesSchema = SchemaFactory.createForClass(ArrayMessage);

// export type MessagesDocument = Messeges & Document;

@Schema()
export class Messeges extends Document {
    @Prop({ type: String, required: true })
    createUserId: string;

    @Prop({ type: String, required: true })
    nameRoom: string;

    @Prop({ type: String, required: true })
    group: string;

    @Prop({ type: [ArrayMessegesSchema], default: [], required: true })
    messages?: Array<ArrayMessage>

}

export const MessegesSchema = SchemaFactory.createForClass(Messeges);
