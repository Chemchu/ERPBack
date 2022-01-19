import { Schema, model, Model, Types } from 'mongoose';
import { IDBState } from '../types/DBState';
import { ITPV } from '../types/TPV';


export class TPV {
    private modelo: Model<ITPV & IDBState>;

    constructor() {
        const TPVSchema = new Schema({
            nombre: { Type: String },
            usadaPor: { type: Types.ObjectId, ref: 'Empleados' },
            apertura: { type: Date },
            cierre: { type: Date },
            abierta: { type: Boolean, required: true },

        }, { strict: false, timestamps: true }) as Schema<ITPV & IDBState>;

        this.modelo = model<ITPV & IDBState>('TPV', TPVSchema);
    }

    public get Model(): Model<ITPV & IDBState> {
        return this.modelo;
    }
}

export default TPV;
