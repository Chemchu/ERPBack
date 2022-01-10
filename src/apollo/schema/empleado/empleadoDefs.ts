import { gql } from "apollo-server-express"

const EmpleadoDefs = gql`
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

export default EmpleadoDefs