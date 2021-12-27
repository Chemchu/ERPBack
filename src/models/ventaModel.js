"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
const mongoose_1 = require("mongoose");
class Venta {
    constructor() {
        const ProductoVendidoSchema = new mongoose_1.Schema({ _id: String, cantidad: Number, precioUnidad: Number, dto: Number });
        const VentaSchema = new mongoose_1.Schema({
            productos: { type: [ProductoVendidoSchema], required: false },
            dineroEntregadoEfectivo: { type: Number, required: false },
            dineroEntregadoTarjeta: { type: Number, required: false },
            precioVentaTotal: { type: Number, required: false },
            cambio: { type: Number, required: false },
            cliente: { type: mongoose_1.Types.ObjectId, ref: 'Cliente' },
            vendidoPor: { type: mongoose_1.Types.ObjectId, ref: 'Empleados' },
            modificadoPor: { type: mongoose_1.Types.ObjectId, ref: 'Empleados' },
            tipo: { type: String, required: false },
            descuentoEfectivo: { type: Number, required: false },
            descuentoTarjeta: { type: Number, required: false },
            databaseState: { type: String, required: false }
        }, { strict: false, timestamps: false });
        this.modelo = (0, mongoose_1.model)('Venta', VentaSchema);
    }
    get Model() {
        return this.modelo;
    }
}
exports.Venta = Venta;
exports.default = Venta;
