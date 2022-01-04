import { truncate } from 'fs';
import { Schema, model, Model, Types } from 'mongoose';
import { IDBState } from '../types/DBState';
import { IProduct } from '../types/Producto';

export class Producto {
  private modelo: Model<IProduct & IDBState>;

  constructor() {
    const Promocion = new Schema({ cantidadNecesaria: Number, dto: Number, precioFijo: Number });
    const ProductSchema = new Schema({
      nombre: { type: String, required: false },
      //proveedor: { type: Types.ObjectId, ref: 'Proveedores' },
      proveedor: { type: String, required: false },
      familia: { type: String, required: false },
      precioVenta: { type: Number, required: false },
      precioCompra: { type: Number, required: false },
      iva: { type: Number, required: false },
      ean: { type: String, required: false },
      margen: { type: Number, required: false },
      promociones: { type: [String], required: false },
      alta: { type: Boolean, required: false },
      img: { type: Buffer as unknown as Buffer, required: false },
      cantidad: { type: Number, required: false },
      cantidadRestock: { type: Number, required: false },
      databaseState: { type: String, required: false }

    }, { strict: true }) as Schema<IProduct & IDBState>;

    this.modelo = model<IProduct & IDBState>('Producto', ProductSchema);
  }

  public get Model(): Model<IProduct & IDBState> {
    return this.modelo;
  }
}
