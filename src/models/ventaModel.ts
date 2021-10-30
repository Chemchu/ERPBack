import {Schema, model, Model, Types} from 'mongoose';
import { ISale } from '../types/Venta';
import { Tupla } from '../types/Tupla';

export class Venta {
    private modelo: Model<ISale>;

    constructor(){
        const VentaSchema = new Schema({
            productos: [{type: Types.ObjectId, ref: 'Producto'}],
            precioVentaTotal: {type: Number, required: true},
            dineroEntregado: {type: [String, Number], required: true},
            cambio: {type: Number, required: true},
            cliente: {type: Types.ObjectId, ref: 'Cliente'},
            tipo: {type: String, required: true}
        }, {strict: true, timestamps: true});

        this.modelo = model<ISale>('Venta', VentaSchema);
    }

    public get Model(): Model<ISale> {
        return this.modelo;
    }
}

export default Venta;
