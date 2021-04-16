import { Document } from "mongoose";

export interface IAdmin extends Document {
    readonly email: string;
    readonly password: string;
    readonly role:string
}