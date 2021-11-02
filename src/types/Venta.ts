import { Document } from 'mongoose';
import { IClient } from './Cliente';
import { IProduct } from './Producto';

export interface ISale extends Document {
    productos: string[],
    dineroEntregadoEfectivo: number,
    dineroEntregadoTarjeta: number,
    precioVentaTotal: number,
    cambio: number,
    cliente?: IClient,
    tipo: string
}