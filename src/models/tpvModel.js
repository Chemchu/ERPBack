"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TPV = void 0;
const mongoose_1 = require("mongoose");
class TPV {
    constructor() {
        const TPVSchema = new mongoose_1.Schema({
            nombre: { type: String, requiered: true },
            enUsoPor: { type: mongoose_1.Types.ObjectId, ref: 'Empleados', requiered: true },
            libre: { type: Boolean, requiered: true },
            cajaInicial: { type: Number, requiered: true }
        }, { strict: true, timestamps: true });
        this.modelo = (0, mongoose_1.model)('TPV', TPVSchema);
    }
    get Model() {
        return this.modelo;
    }
}
exports.TPV = TPV;
