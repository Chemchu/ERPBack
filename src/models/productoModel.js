"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false },
    familia: { type: String, required: false },
    precioVenta: { type: Number, required: true },
    precioCompra: { type: Number, required: false },
    IVA: { type: Number, required: false },
    EAN: { type: String, required: false },
    alta: { type: Boolean, required: true },
    tag: { type: String, required: false },
});
exports.default = (0, mongoose_1.model)('productos', exports.ProductSchema);
