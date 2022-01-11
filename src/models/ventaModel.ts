import { Schema, model, Model, Types } from 'mongoose';
import { IDBState } from '../types/DBState';
import { IEmployee } from '../types/Empleado';
import { ISale } from '../types/Venta';


export class Venta {
    private modelo: Model<ISale & IDBState>;

    constructor() {
        const ProductoVendidoSchema = new Schema({ _id: String, cantidad: Number, precioUnidad: Number, dto: Number });
        const VentaSchema = new Schema({
            productos: { type: [ProductoVendidoSchema], required: false },
            dineroEntregadoEfectivo: { type: Number, required: false },
            dineroEntregadoTarjeta: { type: Number, required: false },
            precioVentaTotal: { type: Number, required: false },
            cambio: { type: Number, required: false },
            cliente: { type: Types.ObjectId, ref: 'Cliente' },
            vendidoPor: { type: Types.ObjectId, ref: 'Empleados' },
            modificadoPor: { type: Types.ObjectId, ref: 'Empleados' },
            tipo: { type: String, required: false },
            descuentoEfectivo: { type: Number, required: false },
            descuentoTarjeta: { type: Number, required: false },
            databaseState: { type: String, required: false }
        }, { strict: false, timestamps: true }) as Schema<ISale & IDBState>;

        this.modelo = model<ISale & IDBState>('Venta', VentaSchema);
    }

    public get Model(): Model<ISale & IDBState> {
        return this.modelo;
    }
}

export default Venta;
