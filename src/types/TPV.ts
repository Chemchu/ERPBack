import { Document, ObjectId } from 'mongoose';
import { IEmployee } from './Empleado';

export interface ITPV extends Document {
    nombre: string
    usadaPor: IEmployee['_id'];
    apertura: Date
    cierre: Date
    abierta: boolean
}