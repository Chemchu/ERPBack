import {Schema, model, Model} from 'mongoose';
import { IProduct } from '../types/Producto';

export class Producto {
  private modelo: Model<IProduct>;

  constructor(){
      const ProductSchema = new Schema({
        nombre: {type: String, required: true},
        descripcion: {type: String, required: false},
        familia: {type: String, required: false},
        precioVenta: {type: Number, required: true},
        precioCompra: {type: Number, required: false},
        IVA: {type: Number, required: false},
        EAN: {type: [String], required: false},
        alta: {type: Boolean, required: true},
        tag: {type: String, required: false},
      });

      this.modelo = model<IProduct>('Producto', ProductSchema);
  }

  public get Model(): Model<IProduct> {
      return this.modelo;
  }
}
