import { Document } from 'mongoose';

export interface IStudentToken extends Document {
  readonly token: string;
  readonly uId: string;
  readonly expireAt: string;
}