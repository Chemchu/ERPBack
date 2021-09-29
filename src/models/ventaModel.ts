import {Schema, model, Document, Model} from 'mongoose';
import { IClient, Cliente } from './clienteModel';
import { IProduct, Producto } from './productoModel';

export interface ISale extends Document {
    Productos: IProduct[],
    PrecioVentaTotal: number,
    Fecha: Date,
    Cliente?: IClient
}

export class Venta {
    private modelo: Model<ISale>;

    constructor(){
        const VentaSchema = new Schema({
            Productos: {type: [Producto], required: true},
            PrecioVentaTotal: {type: Number, required: true},
            Fecha: {type: Date, required: true},
            Cliente: {type: Cliente},
        });

        this.modelo = model<ISale>('Venta', VentaSchema);
    }

    public get Model(): Model<ISale> {
        return this.modelo;
    }
}

export default Venta;
