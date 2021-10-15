"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
const mongoose_1 = require("mongoose");
class Venta {
    constructor() {
        const VentaSchema = new mongoose_1.Schema({
            productos: [{ type: mongoose_1.Types.ObjectId, ref: 'Producto' }],
            precioVentaTotal: { type: Number, required: true },
            cliente: { type: mongoose_1.Types.ObjectId, ref: 'Cliente' },
        }, { timestamps: true });
        this.modelo = (0, mongoose_1.model)('Venta', VentaSchema);
    }
    get Model() {
        return this.modelo;
    }
}
exports.Venta = Venta;
exports.default = Venta;
