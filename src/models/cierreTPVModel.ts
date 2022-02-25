import { Schema, model, Model, Types } from 'mongoose';
import { IEmployee } from '../types/Empleado';
import { ICierreTPV } from '../types/TPV';
export class CierreTPV {
    private modelo: Model<ICierreTPV>;

    constructor() {
        const EmpleadoSchema = new Schema({
            nombre: { type: String, requiered: true },
            apellidos: { type: String, requiered: true },
            dni: { type: String, requiered: true },
            email: { type: String, requiered: true },
            fechaAlta: { type: Date, required: true },
            genero: { type: String, requiered: false },
            hashPassword: { type: String, requiered: true },
            horasPorSemana: { type: Number, requiered: false },
            rol: { type: String, requiered: true },
        }, { strict: true, timestamps: false }) as Schema<IEmployee>;

        const CierreTPVSchema = new Schema({
            tpv: { type: Types.ObjectId, ref: 'TPV', required: true },
            abiertoPor: { type: EmpleadoSchema, required: true },
            cerradoPor: { type: EmpleadoSchema, required: true },
            apertura: { type: Date, required: true },
            cierre: { type: Date, required: true },
            cajaInicial: { type: Number, required: true },
            ventasEfectivo: { type: Number, required: true },
            ventasTarjeta: { type: Number, required: true },
            ventasTotales: { type: Number, required: true },
            dineroRetirado: { type: Number, required: true },
            fondoDeCaja: { type: Number, required: true },
            beneficio: { type: Number, required: true },
            nota: { type: String, required: false }

        }, { strict: true }) as Schema<ICierreTPV>;

        this.modelo = model<ICierreTPV>('CierresTPV', CierreTPVSchema);
    }

    public get Model(): Model<ICierreTPV> {
        return this.modelo;
    }
}

