"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Empleado = void 0;
const mongoose_1 = require("mongoose");
class Empleado {
    constructor() {
        const EmpleadoSchema = new mongoose_1.Schema({
            nombre: { type: String, required: true },
            apellidos: { type: String, required: true },
            genero: { type: String, required: true },
            correoElectrónico: { type: String, required: true },
            horasPorSemana: { type: Number, required: true },
            fechaAlta: { type: Date, required: true },
            fechaBaja: { type: Date, required: true },
            diasLibresDisponibles: { type: Number, required: true },
            alta: { type: Boolean, required: true },
        });
        this.modelo = (0, mongoose_1.model)('Empleado', EmpleadoSchema);
    }
    get Model() {
        return this.modelo;
    }
}
exports.Empleado = Empleado;
