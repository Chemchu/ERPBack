import { gql } from "apollo-server-express"

const ClienteDefs = gql`
    ##### Tipos #####

    type Cliente {
        _id: ID!
        nif: String!
        nombre: String!
        calle: String!
        cp: String!
    }

    type ClienteMutationResponse {
        message: String!
        successful: Boolean!
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

    ##### Mutation #####

    type Mutation {
        addCliente(nif: String!, nombre: String!, calle: String, cp: String): ClienteMutationResponse!,
        deleteCliente(_id: ID!): ClienteMutationResponse!,
        updateCliente(_id: ID!, nif: String, nombre: String, calle: String, cp: String): ClienteMutationResponse!,
    }
`;

export default ClienteDefs