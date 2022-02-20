import { gql } from "apollo-server-express"

const VentaDefs = gql`
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
        descuentoTarjeta: Float
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
    }

    input VentaFields {
        productos: [ProductoVendidoInput]!
        dineroEntregadoEfectivo: Float!
        dineroEntregadoTarjeta: Float!
        precioVentaTotal: Float!
        cambio: Float
        cliente: ID!
        vendidoPor: ID!
        modificadoPor: ID!
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
        
        updateVenta(_id: ID!, productos: [ProductoVendidoInput], dineroEntregadoEfectivo: Float, dineroEntregadoTarjeta: Float, precioVentaTotal: Float!, cambio: Float,
            clienteId: ID, vendidoPor: ID, modificadoPor: ID, tipo: String, descuentoEfectivo: Float, 
            descuentoPorcentaje: Float): VentaMutationResponse!
    }
`;

export default VentaDefs