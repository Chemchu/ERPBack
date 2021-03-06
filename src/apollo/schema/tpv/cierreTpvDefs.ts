import { gql } from "apollo-server-express"

const cierreTpvDefs = gql`
    ##### Tipos #####

    type CierreTPV {
        _id: ID!,
        tpv: ID!,
        cajaInicial: Float,
        abiertoPor: Empleado,
        cerradoPor: Empleado,
        apertura: String,
        cierre: String,
        ventasEfectivo: Float,
        ventasTarjeta: Float,
        ventasTotales: Float,
        dineroRetirado:Float,
        fondoDeCaja: Float,
        beneficio: Float,
        nota: String
    }

    input CierreTPVInput {
        _id: ID,
        tpv: ID!,
        cajaInicial: Float!,
        abiertoPor: EmpleadoInput!,
        cerradoPor: EmpleadoInput!,
        apertura: String!,
        cierre: String,
        numVentas: Int!
        ventasEfectivo: Float!,
        ventasTarjeta: Float!,
        ventasTotales: Float!,
        dineroEsperadoEnCaja: Float!,
        dineroRealEnCaja: Float!,
        dineroRetirado:Float!,
        fondoDeCaja: Float!,
        nota: String,
    }

    input EmpleadoInput {
        _id: ID!
        nombre: String!
        apellidos: String!
        dni: String
        rol: String!
        genero: String
        email: String!
        horasPorSemana: Float
        fechaAlta: String
    }

    type CierreTPVMutationResponse {
        message: String!
        successful: Boolean!
        token: String
    }

    input CierreTPVFind {
        _id: ID
        fecha: String
    }

    input CierresTPVFind {
        fecha: String
    }

    ##### Query #####

    type Query {
        cierreTPV(find: CierreTPVFind!): CierreTPV
        cierresTPVs(find: CierresTPVFind, limit: Int): [CierreTPV]
    }

    ##### Mutation #####
    
    type Mutation {
        addCierreTPV(cierre: CierreTPVInput!): CierreTPVMutationResponse!        
        deleteCierreTPV(_id: ID!): TPVMutationResponse!        
        updateCierreTPV(cierre: CierreTPVInput): CierreTPVMutationResponse!
    }
`;

export default cierreTpvDefs;