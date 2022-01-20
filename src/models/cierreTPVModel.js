"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CierreTPV = void 0;
const mongoose_1 = require("mongoose");
class CierreTPV {
    constructor() {
        const CierreTPVSchema = new mongoose_1.Schema({
            tpv: { type: mongoose_1.Types.ObjectId, ref: 'TPV' },
            abiertoPor: { type: mongoose_1.Types.ObjectId, ref: 'Empleados' },
            cerradoPor: { type: mongoose_1.Types.ObjectId, ref: 'Empleados' },
            apertura: { type: Date },
            cierre: { type: Date },
            ventasEfectivo: { type: Number },
            ventasTarjeta: { type: Number },
            ventasTotales: { type: Number },
            dineroRetirado: { type: Number },
            fondoDeCaja: { type: Number },
            beneficio: { type: Number }
        }, { strict: true, timestamps: true });
        this.modelo = (0, mongoose_1.model)('CierresTPV', CierreTPVSchema);
    }
    get Model() {
        return this.modelo;
    }
}
exports.CierreTPV = CierreTPV;
