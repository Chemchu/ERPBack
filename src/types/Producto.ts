import { Document, SchemaDefinition } from 'mongoose';
import { IProveedor } from './Proveedor';

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