"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginResolver_1 = require("./schema/authentication/loginResolver");
const clienteResolver_1 = require("./schema/cliente/clienteResolver");
const empleadoResolver_1 = require("./schema/empleado/empleadoResolver");
const productoResolver_1 = require("./schema/producto/productoResolver");
const ventaResolver_1 = require("./schema/venta/ventaResolver");
const Resolvers = {
    Query: {
        producto: productoResolver_1.productoResolver,
        productos: productoResolver_1.productosResolver,
        venta: ventaResolver_1.ventaResolver,
        ventas: ventaResolver_1.ventasResolver,
        cliente: clienteResolver_1.clienteResolver,
        clientes: clienteResolver_1.clientesResolver,
        empleado: empleadoResolver_1.empleadoResolver,
        empleados: empleadoResolver_1.empleadosResolver,
        login: loginResolver_1.loginResolver
    },
};
exports.default = Resolvers;
