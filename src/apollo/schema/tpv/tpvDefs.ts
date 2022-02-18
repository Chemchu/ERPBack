import { gql } from "apollo-server-express"

const tpvDefs = gql`
    ##### Tipos #####

    type TPV {
        _id: ID!
        nombre: String
        enUsoPor: ID
        libre: Boolean
        cajaInicial: Int
    }

    type TPVMutationResponse {
        message: String!
        successful: Boolean!
    }

    input TPVFind {
        _id: ID
        nombre: String
    }

    input TPVsFind {
        libre: Boolean!
    }


    ##### Query #####

    type Query {
        tpv(find: TPVFind!): TPV
        tpvs(find: TPVsFind, limit: Int): [TPV]
    }

    ##### Mutation #####
    
    type Mutation {
        addTPV(nombre: String!, enUsoPor: ID, libre: Boolean, cajaInicial: Int): TPVMutationResponse!
        
        deleteTPV(_id: ID!): TPVMutationResponse!
        
        updateTPV(_id: ID!, nombre: String, enUsoPor: ID, libre: Boolean, cajaInicial: Int): TPVMutationResponse!
    }
`;

export default tpvDefs;