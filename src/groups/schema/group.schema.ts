import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { status } from "../enum/status.enum";

export type GroupDocument = Group & Document;

@Schema()
export class Group {
    @Prop({ type: String, required: true })
    group: string;

    @Prop({ type: String, enum: Object.values(status), default: status.active })
    status: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);