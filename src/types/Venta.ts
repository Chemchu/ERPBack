import { Document } from 'mongoose';
import { IClient } from './Cliente';
import { IProduct } from './Producto';

export interface ISale extends Document {
    Productos: [IProduct],
    PrecioVentaTotal: number,
    Fecha: Date,
    Cliente?: IClient
}