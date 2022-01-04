import { Document } from 'mongoose';

export interface IDBState extends Document {
    databaseState: string
}