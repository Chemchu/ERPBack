"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OldEmpleado = void 0;
const mongoose_1 = require("mongoose");
class OldEmpleado {
    constructor() {
        const EmpleadoSchema = new mongoose_1.Schema({
            nombre: { type: String, required: true },
            apellidos: { type: String, required: true },
            dni: { type: String, required: true, unique: true },
            genero: { type: String, required: true },
            email: { type: String, required: true },
        }, { strict: true });
        this.modelo = (0, mongoose_1.model)('AntiguosEmpleados', EmpleadoSchema);
    }
    get Model() {
        return this.modelo;
    }
}
exports.OldEmpleado = OldEmpleado;
