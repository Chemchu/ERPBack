"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtValidatorResolver_1 = require("./schema/authentication/jwtValidatorResolver");
const loginResolver_1 = require("./schema/authentication/loginResolver");
const clienteResolver_1 = require("./schema/cliente/clienteResolver");
const empleadoResolver_1 = require("./schema/empleado/empleadoResolver");
const fileResolvers_1 = require("./schema/file/fileResolvers");
const productoResolver_1 = require("./schema/producto/productoResolver");
const cierreTpvResolver_1 = require("./schema/tpv/cierreTpvResolver");
const tpvResolver_1 = require("./schema/tpv/tpvResolver");
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
        tpv: tpvResolver_1.tpvResolver,
        tpvs: tpvResolver_1.tpvsResolver,
        cierreTPV: cierreTpvResolver_1.cierreTpvResolver,
        cierresTPVs: cierreTpvResolver_1.cierreTpvsResolver,
        validateJwt: jwtValidatorResolver_1.jwtValidatorResolver
    },
    Mutation: {
        addProducto: productoResolver_1.addProductoResolver,
        addProductosFile: fileResolvers_1.uploadProductoFileResolver,
        deleteProducto: productoResolver_1.deleteProductoResolver,
        updateProducto: productoResolver_1.updateProductoResolver,
        addCliente: clienteResolver_1.addClienteResolver,
        deleteCliente: clienteResolver_1.deleteClienteResolver,
        updateCliente: clienteResolver_1.updateClienteResolver,
        addVenta: ventaResolver_1.addVentaResolver,
        addVentasFile: fileResolvers_1.uploadVentasFileResolver,
        deleteVenta: ventaResolver_1.deleteVentaResolver,
        updateVenta: ventaResolver_1.updateVentaResolver,
        addEmpleado: empleadoResolver_1.addEmpleadoResolver,
        deleteEmpleado: empleadoResolver_1.deleteEmpleadoResolver,
        updateEmpleado: empleadoResolver_1.updateEmpleadoResolver,
        addTPV: tpvResolver_1.addTpvResolver,
        deleteTPV: tpvResolver_1.deleteTpvResolver,
        updateTPV: tpvResolver_1.updateTpvResolver,
        ocupyTPV: tpvResolver_1.ocupyTpvResolver,
        freeTPV: tpvResolver_1.freeTpvResolver,
        addCierreTPV: cierreTpvResolver_1.addCierreTpvResolver,
        deleteCierreTPV: cierreTpvResolver_1.deleteCierreTpvResolver,
        updateCierreTPV: cierreTpvResolver_1.updateCierreTpvResolver
    }
};
exports.default = Resolvers;
