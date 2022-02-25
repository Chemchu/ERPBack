"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const VentaDefs = (0, apollo_server_express_1.gql) `
    ##### Tipos #####

    type Venta {
        _id: ID!
        productos: [ProductoVendido]
        dineroEntregadoEfectivo: Float
        dineroEntregadoTarjeta: Float
        precioVentaTotal: Float
        cambio: Float
        cliente: Cliente
        vendidoPor: Empleado
        modificadoPor: Empleado
        tipo: String
        descuentoEfectivo: Float
        descuentoPorcentaje: Float
        tpv: ID
        createdAt: String
        updatedAt: String
    }

    type VentaMutationResponse {
        message: String!
        successful: Boolean!
    } 

    type ProductoVendido {
        _id: ID!
        nombre: String
        proveedor: String
        familia: String
        precioVenta: Float
        precioCompra: Float
        iva: Float
        margen: Float
        ean: String
        cantidadVendida: Int
        createdAt: String
        updatedAt: String
    }

    input ProductoVendidoInput {
        _id: ID!
        nombre: String
        proveedor: String
        familia: String
        precioVenta: Float
        precioCompra: Float
        iva: Float
        margen: Float
        ean: String
        cantidadVendida: Int
        createdAt: String
        updatedAt: String
        dto: Float
    }

    input VentasFind {
        _ids: [ID!]
        clienteId: String
        tipo: String
        vendedorId: String
        createdAt: String
        tpv: ID
    }

    input ClienteInput {
        _id: ID!
        nif: String!
        nombre: String!
        calle: String!
        cp: String!
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

    input VentaFields {
        productos: [ProductoVendidoInput]!
        dineroEntregadoEfectivo: Float!
        dineroEntregadoTarjeta: Float!
        precioVentaTotal: Float!
        cambio: Float!
        cliente: ClienteInput!
        vendidoPor: EmpleadoInput!
        modificadoPor: EmpleadoInput!
        tipo: String!
        descuentoEfectivo: Float!
        descuentoPorcentaje: Float!
        tpv: ID!
    }

    ##### Query #####

    type Query {        
        venta(_id: ID!): Venta
        ventas(find: VentasFind, limit: Int, order: String, offset: Int): [Venta]
    }

    ##### Mutation #####
    
    type Mutation {
        addVenta(fields: VentaFields!): VentaMutationResponse!
        
        deleteVenta(_id: ID!): VentaMutationResponse!
        
        updateVenta(_id: ID!, productos: [ProductoVendidoInput], dineroEntregadoEfectivo: Float, descuentoPorcentaje: Float, precioVentaTotal: Float!, cambio: Float,
            clienteId: ClienteInput, vendidoPor: EmpleadoInput, modificadoPor: EmpleadoInput, tipo: String, descuentoEfectivo: Float): VentaMutationResponse!
    }
`;
exports.default = VentaDefs;
