
import { Document, Types } from 'mongoose';

export type DbDocument<T> = Document<unknown, {}, T> & T & {
    _id: Types.ObjectId;
}