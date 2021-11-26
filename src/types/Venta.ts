import { Document, SchemaDefinition } from 'mongoose';
import { IClient } from './Cliente';
import { IEmployee } from './Empleado';

export interface ISale extends Document {
    productos: SchemaDefinition[],
    dineroEntregadoEfectivo: number,
    dineroEntregadoTarjeta: number,
    precioVentaTotal: number,
    cambio: number,
    cliente: IClient["_id"],
    vendidoPor: IEmployee["_id"],
    modificadoPor: IEmployee["_id"],
    tipo: string,
    descuentoEfectivo: number,
    descuentoTarjeta: number,
}