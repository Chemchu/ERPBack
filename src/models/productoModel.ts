import { Schema, model, Model } from 'mongoose';
import { IProduct } from '../types/Producto';

export class Producto {
  private modelo: Model<IProduct>;

  constructor() {
    const Promocion = new Schema({ cantidadNecesaria: Number, dto: Number, precioFijo: Number });
    const ProductSchema = new Schema({
      nombre: { type: String, required: false },
      proveedor: { type: String, required: false },
      familia: { type: String, required: false },
      precioVenta: { type: Number, required: false },
      precioCompra: { type: Number, required: false },
      iva: { type: Number, required: false },
      ean: { type: String, required: false },
      margen: { type: Number, required: false },
      promociones: { type: [String], required: false },
      alta: { type: Boolean, required: false },
      img: { type: String, required: false },
      cantidad: { type: Number, required: false },
      cantidadRestock: { type: Number, required: false },
    }, { strict: true, timestamps: true }) as Schema<IProduct>;

    this.modelo = model<IProduct>('Producto', ProductSchema);
  }

  public get Model(): Model<IProduct> {
    return this.modelo;
  }
}
