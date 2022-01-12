"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productoResolver_1 = require("./schema/producto/productoResolver");
const ventaResolver_1 = require("./schema/venta/ventaResolver");
const Resolvers = {
    Query: {
        producto: productoResolver_1.productoResolver,
        productos: productoResolver_1.productosResolver,
        venta: ventaResolver_1.ventaResolver,
        ventas: ventaResolver_1.ventasResolver
    },
};
exports.default = Resolvers;
