import { Document } from 'mongoose';

export interface IProveedor extends Document {
    nombre: string,
    cif: string,
    direccion?: string,
    telefono?: string
    localidad?: string
    provincia?: string,
    cp?: string,
    pais?: string,
    email?: string,
    nombreContacto?: string,
}