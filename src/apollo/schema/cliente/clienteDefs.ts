import { gql } from "apollo-server-express"

const ClienteDefs = gql`
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

export default ClienteDefs