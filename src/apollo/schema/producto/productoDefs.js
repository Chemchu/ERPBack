"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const productoDefs = (0, apollo_server_express_1.gql) `
    ##### Tipos #####

    type Producto {
        _id: ID!
        nombre: String
        proveedor: String
        familia: String
        precioVenta: Float
        precioCompra: Float
        iva: Float
        margen: Float
        promociones: [String]
        ean: String
        cantidad: Int
        cantidadRestock: Int
        alta: Boolean
        img: String
        createdAt: String
        updatedAt: String
    }

    input ProductosFind {
        _id: [ID!]
        nombre: String
        familia: String
        proveedor: String
    }


    ##### Query #####

    type Query {
        producto(_id: ID!): Producto
        productos(find: ProductosFind, limit: Int, order: String): [Producto]
    }
`;
exports.default = productoDefs;
