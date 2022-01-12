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
        cantidadComprada: Int
        createdAt: String
        updatedAt: String
    }

    input VentasFind {
        _id: [ID!]
        clienteId: String
        tipo: String
        vendedorId: String
        createdAt: String
    }


    ##### Query #####

    type Query {        
        venta(_id: ID!): Venta
        ventas(find: VentasFind, limit: Int, order: String, offset: Int): [Venta]
    }
`;

export default VentaDefs