import { Document } from 'mongoose';

export interface IProduct extends Document {
    nombre: string
    descripcion: string
    familia: string
    precioVenta: number
    precioCompra: number
    iva: number
    ean: string[]
    alta: boolean
    tags: string[]
}