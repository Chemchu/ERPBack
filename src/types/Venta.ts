import { Document } from 'mongoose';
import { IClient } from './Cliente';
import { IEmployee } from './Empleado';
import { ISoldProduct } from './Producto';
import { ITPV } from './TPV';

export interface ISale extends Document {
    productos: ISoldProduct[],
    dineroEntregadoEfectivo: number,
    dineroEntregadoTarjeta: number,
    precioVentaTotal: number,
    cambio: number,
    cliente: IClient["_id"],
    vendidoPor: IEmployee["_id"],
    modificadoPor: IEmployee["_id"],
    tipo: string,
    descuentoEfectivo: number,
    descuentoPorcentaje: number,
    tpv: ITPV['_id']
}
