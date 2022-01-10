"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const EmpleadoDefs = (0, apollo_server_express_1.gql) `
    ##### Tipos #####

    type Empleado {
        _id: ID!
        nombre: String
        apellidos: String
        dni: String
        rol: String
        genero: String
        email: String
        horasPorSemana: Float
        fechaAlta: String
        diasLibresDisponibles: Int
    }

    input EmpleadosFind {
        _id: ID
        nombre: String
        nif: String
    }

    ##### Query #####

    type Query {        
        empleado(_id: ID!): Empleado
        empleados(find: EmpleadosFind, limit: Int): [Empleado]
    }
`;
exports.default = EmpleadoDefs;
