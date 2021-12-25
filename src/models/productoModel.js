"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const mongoose_1 = require("mongoose");
class Producto {
    constructor() {
        const Promocion = new mongoose_1.Schema({ cantidadNecesaria: Number, dto: Number, precioFijo: Number });
        const ProductSchema = new mongoose_1.Schema({
            nombre: { type: String, required: false },
            descripcion: { type: String, required: false },
            familia: { type: String, required: false },
            precioVenta: { type: Number, required: false },
            precioCompra: { type: Number, required: false },
            promociones: { type: [Promocion], required: false },
            iva: { type: Number, required: false },
            ean: { type: [], required: false },
            alta: { type: Boolean, required: false },
            tags: { type: [], required: false },
            img: { type: Buffer, required: false },
            cantidad: { type: Number, required: false },
            databaseState: { type: String, required: false }
        }, { strict: true });
        this.modelo = (0, mongoose_1.model)('Producto', ProductSchema);
    }
    get Model() {
        return this.modelo;
    }
}
exports.Producto = Producto;
