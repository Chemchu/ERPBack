"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const ClienteDefs = (0, apollo_server_express_1.gql) `
    ##### Tipos #####

    type Cliente {
        _id: ID!
        nif: String
        nombre: String
        calle: String
        cp: String
    }

    input ClientesFind {
        _id: ID
        nif: String
        nombre: String
    }

    ##### Query #####

    type Query {
        cliente(_id: ID!): Cliente
        clientes(find: ClientesFind, limit: Int): [Cliente]
    }
`;
exports.default = ClienteDefs;
