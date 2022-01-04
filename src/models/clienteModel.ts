import { Schema, model, Model } from 'mongoose';
import { IClient } from '../types/Cliente';
import { IDBState } from '../types/DBState';

export class Cliente {
    private modelo: Model<IClient & IDBState>;

    constructor() {
        const ClientSchema = new Schema({
            nif: { type: String, required: false },
            nombre: { type: String, required: false },
            calle: { type: String, required: false },
            cp: { type: String, required: false },
            databaseState: { type: String, required: false }
        }, { strict: true }) as Schema<IClient & IDBState>;

        this.modelo = model<IClient & IDBState>('Cliente', ClientSchema);
    }

    public get Model(): Model<IClient & IDBState> {
        return this.modelo;
    }
}