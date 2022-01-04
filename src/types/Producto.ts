import { Document, SchemaDefinition } from 'mongoose';
import { IProveedor } from './Proveedor';

export interface IProduct extends Document {
    nombre: string
    proveedor: IProveedor['_id']
    familia: string
    precioVenta: number
    precioCompra: number
    iva: number
    margen: number
    promociones: SchemaDefinition[]
    ean: string
    cantidad: number
    cantidadRestock: number
    alta: boolean
    img: Buffer
}