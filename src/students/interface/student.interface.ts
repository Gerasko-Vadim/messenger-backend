import { Document } from "mongoose";

export interface IStudent extends Document {
    readonly name: string;
    readonly surname: string;
    readonly email: string;
    readonly group: string;
    readonly password: string;
    isActive: string


}