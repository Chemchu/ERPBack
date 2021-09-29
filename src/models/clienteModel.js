"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
var mongoose_1 = require("mongoose");
var Cliente = (function () {
    function Cliente() {
        var ClientSchema = new mongoose_1.Schema({
            NIF: { type: String, required: true },
            Nombre: { type: String, required: true },
            Calle: { type: String, required: true },
            CP: { type: String, required: true },
        });
        this.modelo = (0, mongoose_1.model)('Cliente', ClientSchema);
    }
    Object.defineProperty(Cliente.prototype, "Model", {
        get: function () {
            return this.modelo;
        },
        enumerable: false,
        configurable: true
    });
    return Cliente;
}());
exports.Cliente = Cliente;
