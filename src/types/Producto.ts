import { Document, SchemaDefinition } from 'mongoose';

export interface IProduct extends Document {
    nombre: string
    descripcion: string
    familia: string
    precioVenta: number
    precioCompra: number
    promociones: SchemaDefinition[]
    iva: number
    ean: string[]
    alta: boolean
    tags: string[]
    img: Buffer
    cantidad: number
}