"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const mongoose_1 = require("mongoose");
class Cliente {
    constructor() {
        const ClientSchema = new mongoose_1.Schema({
            NIF: { type: String, required: true },
            Nombre: { type: String, required: true },
            Calle: { type: String, required: true },
            CP: { type: String, required: true },
        });
        this.modelo = (0, mongoose_1.model)('Cliente', ClientSchema);
    }
    get Model() {
        return this.modelo;
    }
}
exports.Cliente = Cliente;
