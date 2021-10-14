import {Schema, model, Model} from 'mongoose';
import { IClient } from '../types/Cliente';

export class Cliente {
    private modelo: Model<IClient>;

    constructor(){
        const ClientSchema = new Schema({
            NIF: {type: String, required: true},
            Nombre: {type: String, required: true},
            Calle: {type: String, required: true},
            CP: {type: String, required: true},
        });

        this.modelo = model<IClient>('Cliente', ClientSchema);
    }

    public get Model(): Model<IClient> {
        return this.modelo;
    }
}