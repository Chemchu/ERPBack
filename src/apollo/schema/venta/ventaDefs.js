"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const VentaDefs = (0, apollo_server_express_1.gql) `
    ##### Tipos #####

    type Venta {
        _id: ID!
        productos: [Producto]
        dineroEntregadoEfectivo: Float
        dineroEntregadoTarjeta: Float
        precioVentaTotal: Float
        cambio: Float
        cliente: Cliente
        vendidoPor: Empleado
        modificadoPor: Empleado
        tipo: String
        descuentoEfectivo: Float
        descuentoTarjeta: Float
        createdAt: String
        updatedAt: String
    }

    input VentasFind {
        _id: [ID!]
        clienteId: String
        tipo: String
        vendedorId: String
        createdAt: String
    }


    ##### Query #####

    type Query {        
        venta(_id: ID!): Venta
        ventas(find: VentasFind, limit: Int): [Venta]
    }
`;
exports.default = VentaDefs;
