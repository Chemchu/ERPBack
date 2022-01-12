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

    input ClienteFind {
        _id: ID
        nif: String
    }

    input ClientesFind {
        _ids: [ID!]
        nombre: String
    }

    ##### Query #####

    type Query {
        cliente(find: ClienteFind!): Cliente
        clientes(find: ClientesFind, limit: Int): [Cliente]
    }
`;
exports.default = ClienteDefs;
