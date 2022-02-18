import { Schema, model, Model, Types } from 'mongoose';
import { ITPV } from '../types/TPV';


export class TPV {
    private modelo: Model<ITPV>;

    constructor() {
        const TPVSchema = new Schema({
            nombre: { type: String, requiered: true },
            enUsoPor: { type: Types.ObjectId, ref: 'Empleados', requiered: true },
            libre: { type: Boolean, requiered: true },
            cajaInicial: { type: Number, requiered: true }
        }, { strict: true, timestamps: true }) as Schema<ITPV>;

        this.modelo = model<ITPV>('TPV', TPVSchema);
    }

    public get Model(): Model<ITPV> {
        return this.modelo;
    }
}
