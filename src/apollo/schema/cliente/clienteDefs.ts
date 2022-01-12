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

export default ClienteDefs