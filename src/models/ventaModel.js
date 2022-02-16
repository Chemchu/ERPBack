"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
const mongoose_1 = require("mongoose");
class Venta {
    constructor() {
        const ProductoVendidoSchema = new mongoose_1.Schema({
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
        }, { strict: true, timestamps: true });
        const VentaSchema = new mongoose_1.Schema({
            productos: { type: [ProductoVendidoSchema], required: true },
            dineroEntregadoEfectivo: { type: Number, required: true },
            dineroEntregadoTarjeta: { type: Number, required: true },
            precioVentaTotal: { type: Number, required: true },
            cambio: { type: Number, required: true },
            cliente: { type: mongoose_1.Types.ObjectId, ref: 'Cliente' },
            vendidoPor: { type: mongoose_1.Types.ObjectId, ref: 'Empleados' },
            modificadoPor: { type: mongoose_1.Types.ObjectId, ref: 'Empleados' },
            tipo: { type: String, required: true },
            descuentoEnEfectivo: { type: Number, required: true },
            descuentoEnPorcentaje: { type: Number, required: true },
            tpv: { type: mongoose_1.Types.ObjectId, ref: 'TPV', required: true },
            databaseState: { type: String, required: false }
        }, { strict: true, timestamps: true });
        this.modelo = (0, mongoose_1.model)('Venta', VentaSchema);
    }
    get Model() {
        return this.modelo;
    }
}
exports.Venta = Venta;
exports.default = Venta;
