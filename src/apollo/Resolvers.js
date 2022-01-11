"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productoResolver_1 = require("./schema/producto/productoResolver");
const Resolvers = {
    Query: {
        producto: productoResolver_1.productoResolver,
        productos: productoResolver_1.productosResolver,
    },
};
exports.default = Resolvers;
