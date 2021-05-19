import { Document } from "mongoose";

export interface IUsers extends Document {
    readonly avatar: string;
    readonly name: string;
    readonly surname: string;
    readonly patronymic: string;
    readonly email: string;
    readonly group: string;
    readonly password: string;
    isActive: string
    role:string
}