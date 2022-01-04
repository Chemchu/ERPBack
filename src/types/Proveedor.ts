import { Document } from 'mongoose';

export interface IProveedor extends Document {
    nombre: string,
    telefono: string
}