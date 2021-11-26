import {Schema, model, Model, Types} from 'mongoose';
import { IEmployee } from '../types/Empleado';
import { ISale } from '../types/Venta';


export class Venta {
    private modelo: Model<ISale>;
    
    constructor(){
        const ProductoVendidoSchema = new Schema({ _id: String, cantidad: Number, precioUnidad: Number, dto: Number });
        const VentaSchema = new Schema({
            productos: {type: [ProductoVendidoSchema], required: true},
            dineroEntregadoEfectivo: { type: Number, required: true},
            dineroEntregadoTarjeta: { type: Number, required: true},
            precioVentaTotal: {type: Number, required: true},
            cambio: {type: Number, required: true},
            cliente: {type: Types.ObjectId, ref: 'Cliente'},
            vendidoPor: {type: Types.ObjectId, ref: 'Empleados'},
            modificadoPor: {type: Types.ObjectId, ref: 'Empleados'},
            tipo: {type: String, required: true},
            descuentoEfectivo: {type: Number, required: true},
            descuentoTarjeta: {type: Number, required: true}, 
        }, {strict: true, timestamps: true}) as Schema<ISale>;

        this.modelo = model<ISale>('Venta', VentaSchema);
    }

    public get Model(): Model<ISale> {
        return this.modelo;
    }
}

export default Venta;
