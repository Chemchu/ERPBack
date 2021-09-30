import {Schema, model, Document, Model, Types} from 'mongoose';
import { IClient } from './clienteModel';
import { IProduct } from './productoModel';

export interface ISale extends Document {
    Productos: [IProduct],
    PrecioVentaTotal: number,
    Fecha: Date,
    Cliente?: IClient
}

export class Venta {
    private modelo: Model<ISale>;

    constructor(){
        const VentaSchema = new Schema({
            Productos: [{type: Types.ObjectId, ref: 'Producto'}],
            PrecioVentaTotal: {type: Number, required: true},
            Fecha: {type: Date, required: true},
            Cliente: {type: Types.ObjectId, ref: 'Cliente'},
        });

        this.modelo = model<ISale>('Venta', VentaSchema);
    }

    public get Model(): Model<ISale> {
        return this.modelo;
    }
}

export default Venta;
