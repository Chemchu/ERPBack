import { Schema, model, Model, Types } from 'mongoose';
import { ICierreTPV, ITPV } from '../types/TPV';


export class CierreTPV {
    private modelo: Model<ICierreTPV>;

    constructor() {
        // De momento el establecimiento es una string, pero quizá en un futuro sea necesario cambiarlo a toda una colección
        const CierreTPVSchema = new Schema({
            tpv: { type: Types.ObjectId, ref: 'TPV' },
            abiertoPor: { type: Types.ObjectId, ref: 'Empleados' },
            cerradoPor: { type: Types.ObjectId, ref: 'Empleados' },
            apertura: { type: Date },
            cierre: { type: Date },
            ventasEfectivo: { type: Number },
            ventasTarjeta: { type: Number },
            ventasTotales: { type: Number },
            dineroRetirado: { type: Number },
            fondoDeCaja: { type: Number },
            beneficio: { type: Number }

        }, { strict: true, timestamps: true }) as Schema<ICierreTPV>;

        this.modelo = model<ICierreTPV>('CierresTPV', CierreTPVSchema);
    }

    public get Model(): Model<ICierreTPV> {
        return this.modelo;
    }
}

