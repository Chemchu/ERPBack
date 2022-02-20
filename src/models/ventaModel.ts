import { Schema, model, Model, Types } from 'mongoose';
import { ISoldProduct } from '../types/Producto';
import { ISale } from '../types/Venta';


export class Venta {
    private modelo: Model<ISale>;

    constructor() {
        const ProductoVendidoSchema = new Schema({
            nombre: { type: String, requiered: true },
            familia: { type: String, requiered: true },
            proveedor: { type: String, requiered: true },
            precioCompra: { type: Number, requiered: true },
            precioVenta: { type: Number, requiered: true },
            cantidadVendida: { type: Number, requiered: true },
            dto: { type: Number, requiered: true },
            iva: { type: Number, requiered: true },
            margen: { type: Number, requiered: true },
            ean: { type: String, requiered: true }
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
            descuentoEfectivo: { type: Number, required: true },
            descuentoPorcentaje: { type: Number, required: true },
            tpv: { type: Types.ObjectId, ref: 'TPV', required: true },
        }, { strict: true, timestamps: true }) as Schema<ISale>;

        this.modelo = model<ISale>('Venta', VentaSchema);
    }

    public get Model(): Model<ISale> {
        return this.modelo;
    }
}

export default Venta;
