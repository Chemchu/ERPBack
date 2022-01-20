"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TPV = void 0;
const mongoose_1 = require("mongoose");
class TPV {
    constructor() {
        const TPVSchema = new mongoose_1.Schema({
            nombre: { type: String },
            enUsoPor: { type: mongoose_1.Types.ObjectId, ref: 'Empleados' },
            abierta: { type: Boolean }
        }, { strict: true, timestamps: true });
        this.modelo = (0, mongoose_1.model)('TPV', TPVSchema);
    }
    get Model() {
        return this.modelo;
    }
}
exports.TPV = TPV;
