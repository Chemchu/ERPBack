import mongoose from 'mongoose';
import { IProduct } from '../types/Producto';
import { IDBState } from '../types/DBState';
export class ProductoDBController {

	public CollectionModel: mongoose.Model<IProduct & IDBState>;

	constructor(modelo: mongoose.Model<IProduct & IDBState>) {
		this.CollectionModel = modelo
	}
}
