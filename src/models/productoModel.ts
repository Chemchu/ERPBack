import {Schema, model, Document} from 'mongoose';

export interface IProduct extends Document {
  nombre: string
  descripcion: string
  familia: string
  precioVenta: number
  precioCompra: number
  IVA: number
  EAN: string[]
  alta: boolean
  tag: string
}

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

const Producto = model<IProduct>('Producto', ProductSchema);
export default Producto;
