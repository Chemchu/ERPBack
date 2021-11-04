"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
const mongoose_1 = require("mongoose");
class Venta {
    constructor() {
        const ProductoVendidoSchema = new mongoose_1.Schema({ _id: String, cantidad: Number, dto: Number, precioUnidad: Number });
        const VentaSchema = new mongoose_1.Schema({
            productos: { type: [ProductoVendidoSchema], required: true },
            precioVentaTotal: { type: Number, required: true },
            dineroEntregadoEfectivo: { type: Number, required: true },
            dineroEntregadoTarjeta: { type: Number, required: true },
            cambio: { type: Number, required: true },
            cliente: { type: mongoose_1.Types.ObjectId, ref: 'Cliente' },
            vendidoPor: { type: mongoose_1.Types.ObjectId, ref: 'Empleados' },
            modificadoPor: { type: mongoose_1.Types.ObjectId, ref: 'Empleados' },
            tipo: { type: String, required: true }
        }, { strict: true, timestamps: true });
        this.modelo = (0, mongoose_1.model)('Venta', VentaSchema);
    }
    get Model() {
        return this.modelo;
    }
}
exports.Venta = Venta;
exports.default = Venta;
