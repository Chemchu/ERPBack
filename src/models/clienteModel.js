"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const mongoose_1 = require("mongoose");
class Cliente {
    constructor() {
        const ClientSchema = new mongoose_1.Schema({
            nif: { type: String, required: false },
            nombre: { type: String, required: false },
            calle: { type: String, required: false },
            cp: { type: String, required: false },
            databaseState: { type: String, required: false }
        }, { strict: true });
        this.modelo = (0, mongoose_1.model)('Cliente', ClientSchema);
    }
    get Model() {
        return this.modelo;
    }
}
exports.Cliente = Cliente;
