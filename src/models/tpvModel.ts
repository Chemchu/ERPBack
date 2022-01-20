import { Schema, model, Model, Types } from 'mongoose';
import { ITPV } from '../types/TPV';


export class TPV {
    private modelo: Model<ITPV>;

    constructor() {
        const TPVSchema = new Schema({
            nombre: { type: String },
            enUsoPor: { type: Types.ObjectId, ref: 'Empleados' },
            abierta: { type: Boolean }
        }, { strict: true, timestamps: true }) as Schema<ITPV>;

        this.modelo = model<ITPV>('TPV', TPVSchema);
    }

    public get Model(): Model<ITPV> {
        return this.modelo;
    }
}
