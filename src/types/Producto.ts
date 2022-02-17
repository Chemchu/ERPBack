import { Document, SchemaDefinition } from 'mongoose';

export interface IProduct extends Document {
    nombre: string
    proveedor: string
    familia: string
    precioVenta: number
    precioCompra: number
    iva: number
    margen: number
    promociones: string[]
    ean: string
    cantidad: number
    cantidadRestock: number
    alta: boolean
    img: string
}

export interface ISoldProduct extends Document {
    nombre: string,
    familia: string,
    precioVenta: number
    precioCompra: number
    cantidadVendida: number,
    dto: number,
    iva: number,
    margen: number,
    proveedor: string
    ean: string
}