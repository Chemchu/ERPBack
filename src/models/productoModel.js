"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producto = void 0;
const mongoose_1 = require("mongoose");
class Producto {
    constructor() {
        const ProductSchema = new mongoose_1.Schema({
            nombre: { type: String, required: true },
            descripcion: { type: String, required: false },
            familia: { type: String, required: false },
            precioVenta: { type: Number, required: true },
            precioCompra: { type: Number, required: false },
            iva: { type: Number, required: false },
            ean: { type: [String], required: false },
            alta: { type: Boolean, required: true },
            tags: { type: [String], required: true },
            img: { type: Buffer, required: false },
            cantidad: { type: Number, required: true }
        }, { strict: true });
        this.modelo = (0, mongoose_1.model)('Producto', ProductSchema);
    }
    get Model() {
        return this.modelo;
    }
}
exports.Producto = Producto;
