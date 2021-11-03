import {Schema, model, Model, Types} from 'mongoose';
import { ISale } from '../types/Venta';


export class Venta {
    private modelo: Model<ISale>;
    
    constructor(){
        const ProductoVendidoSchema = new Schema({ _id: String, cantidad: Number, dto: Number, precioUnidad: Number });
        const VentaSchema = new Schema({
            productos: [ProductoVendidoSchema],
            precioVentaTotal: {type: Number, required: true},
            dineroEntregadoEfectivo: { type: Number, required: true},
            dineroEntregadoTarjeta: { type: Number, required: true},
            cambio: {type: Number, required: true},
            cliente: {type: Types.ObjectId, ref: 'Cliente'},
            tipo: {type: String, required: true}
        }, {strict: true, timestamps: true}) as Schema<ISale>;

        this.modelo = model<ISale>('Venta', VentaSchema);
    }

    public get Model(): Model<ISale> {
        return this.modelo;
    }
}

export default Venta;
