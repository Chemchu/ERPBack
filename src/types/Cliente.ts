import { Document } from 'mongoose';

export interface IClient extends Document {
    NIF: string,
    Nombre: string,
    Calle: string,
    CP: string
}