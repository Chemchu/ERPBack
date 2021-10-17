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
        iva: {type: Number, required: false},
        ean: {type: [String], required: false},
        alta: {type: Boolean, required: true},
        tags: {type: [String], required: true},
      }, {strict: true});

      this.modelo = model<IProduct>('Producto', ProductSchema);
  }

  public get Model(): Model<IProduct> {
      return this.modelo;
  }
}
