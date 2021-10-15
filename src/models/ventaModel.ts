import {Schema, model, Model, Types} from 'mongoose';
import { ISale } from '../types/Venta';

export class Venta {
    private modelo: Model<ISale>;

    constructor(){
        const VentaSchema = new Schema({
            productos: [{type: Types.ObjectId, ref: 'Producto'}],
            precioVentaTotal: {type: Number, required: true},
            cliente: {type: Types.ObjectId, ref: 'Cliente'},
        }, {timestamps: true});

        this.modelo = model<ISale>('Venta', VentaSchema);
    }

    public get Model(): Model<ISale> {
        return this.modelo;
    }
}

export default Venta;
