"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = void 0;
var mongoose_1 = require("mongoose");
var clienteModel_1 = require("./clienteModel");
var productoModel_1 = require("./productoModel");
var Venta = (function () {
    function Venta() {
        var VentaSchema = new mongoose_1.Schema({
            Productos: { type: [productoModel_1.Producto], required: true },
            PrecioVentaTotal: { type: Number, required: true },
            Fecha: { type: Date, required: true },
            Cliente: { type: clienteModel_1.Cliente },
        });
        this.modelo = (0, mongoose_1.model)('Venta', VentaSchema);
    }
    Object.defineProperty(Venta.prototype, "Model", {
        get: function () {
            return this.modelo;
        },
        enumerable: false,
        configurable: true
    });
    return Venta;
}());
exports.Venta = Venta;
exports.default = Venta;
