import { Schema, model, Model, Types } from 'mongoose';
import { IDBState } from '../types/DBState';
import { IEmployee } from '../types/Empleado';
import { IProduct, ISoldProduct } from '../types/Producto';
import { ISale } from '../types/Venta';


export class Venta {
    private modelo: Model<ISale & IDBState>;

    constructor() {
        const ProductoVendidoSchema = new Schema({
            nombre: { type: String },
            familia: { type: String },
            precioUnidad: { type: Number },
            precioTotal: { type: Number },
            cantidad: { type: Number },
            dto: { type: Number },
            iva: { type: Number },
            margen: { type: Number },
            beneficio: { type: Number },
            proveedor: { type: String },
            ean: { type: String }
        }, { strict: true, timestamps: true }) as Schema<ISoldProduct>;

        const VentaSchema = new Schema({
            productos: { type: [ProductoVendidoSchema], required: true },
            dineroEntregadoEfectivo: { type: Number, required: true },
            dineroEntregadoTarjeta: { type: Number, required: true },
            precioVentaTotal: { type: Number, required: true },
            cambio: { type: Number, required: true },
            cliente: { type: Types.ObjectId, ref: 'Cliente' },
            vendidoPor: { type: Types.ObjectId, ref: 'Empleados' },
            modificadoPor: { type: Types.ObjectId, ref: 'Empleados' },
            tipo: { type: String, required: true },
            descuentoEnEfectivo: { type: Number, required: true },
            descuentoEnPorcentaje: { type: Number, required: true },
            tpv: { type: String, required: true },
            databaseState: { type: String, required: false }
        }, { strict: true, timestamps: true }) as Schema<ISale & IDBState>;

        this.modelo = model<ISale & IDBState>('Venta', VentaSchema);
    }

    public get Model(): Model<ISale & IDBState> {
        return this.modelo;
    }
}

export default Venta;
