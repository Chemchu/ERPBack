"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtValidatorResolver_1 = require("./schema/authentication/jwtValidatorResolver");
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
        login: loginResolver_1.loginResolver,
        validateJwt: jwtValidatorResolver_1.jwtValidatorResolver
    },
    Mutation: {
        addProducto: productoResolver_1.addProductoResolver,
        deleteProducto: productoResolver_1.deleteProductoResolver,
        updateProducto: productoResolver_1.updateProductoResolver,
        addCliente: clienteResolver_1.addClienteResolver,
        deleteCliente: clienteResolver_1.deleteClienteResolver,
        updateCliente: clienteResolver_1.updateClienteResolver,
        addVenta: ventaResolver_1.addVentaResolver,
        deleteVenta: ventaResolver_1.deleteVentaResolver,
        updateVenta: ventaResolver_1.updateVentaResolver,
        addEmpleado: empleadoResolver_1.addEmpleadoResolver,
        deleteEmpleado: empleadoResolver_1.deleteEmpleadoResolver,
        updateEmpleado: empleadoResolver_1.updateEmpleadoResolver,
        uploadProductos: productoResolver_1.uploadProductoFileResolver,
        uploadClientes: clienteResolver_1.uploadClienteFileResolver
    }
};
exports.default = Resolvers;
