import { Document, ObjectId } from 'mongoose';
import { IEmployee } from './Empleado';

export interface ITPV extends Document {
    nombre: string
    enUsoPor: IEmployee['_id']
    abierta: boolean
}

export interface ICierreTPV extends Document {
    tpv: ITPV['_id'],
    abiertoPor: IEmployee['_id']
    cerradoPor: IEmployee['_id']
    apertura: Date
    cierre: Date
    ventasEfectivo: number,
    ventasTarjeta: number,
    ventasTotales: number,
    dineroRetirado: number,
    fondoDeCaja: number,
    beneficio: number
}