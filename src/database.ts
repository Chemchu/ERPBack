import mongoose = require('mongoose');
import dotenv = require('dotenv');
import Producto, { ProductSchema } from './models/productoModel';
import { Cliente } from './models/clienteModel';
import { Venta } from './models/ventaModel';
import { ErrorRequestHandler } from 'express';
import { IProduct } from './types/Producto';

mongoose.Promise = global.Promise;
		
dotenv.config();

let cliente = new Cliente();
let venta = new Venta();

const dbInformation : any = {
	mongo : mongoose,
	url: process.env.MONGO_URI == "" ? "mongodb://localhost:27017/" : process.env.MONGO_URI,
	dbName : process.env.DATABASE_NAME == "" ? "erp_db" : process.env.DATABASE_NAME,
	productosCollection : Producto,
	clientesCollection : cliente.Model,
	ventasCollection : venta.Model
};

export class Database {
    private static instance: Database;
	private db: mongoose.Mongoose;

    private constructor () {
		this.db = dbInformation.mongo;

		this.db.connect(dbInformation.url + dbInformation.dbName).then(() => {
            console.log("Connected to the database!");
        }).catch((err: ErrorRequestHandler) => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });

    }

    public static Instance(): Database  {
		if(!this.instance) {
			this.instance = new Database();
		}
		return this.instance;
    }

	public get DB(): mongoose.Mongoose {
		return this.db;
	}

	public async AddProduct(producto: mongoose.Document<IProduct>, prodModel : mongoose.Model<IProduct>): Promise<boolean> {
		const prodName = producto.get('nombre');
		const prodEAN = producto.get('EAN');

		console.log(`Nombre: ${prodName}`);
		console.log(`EAN: ${prodEAN}`);

		var yaExisteProducto = await prodModel.exists({nombre: prodName});
		var yaExisteEAN = await prodModel.exists({EAN: prodEAN});

		if(yaExisteProducto || yaExisteEAN) return false;
		else { producto.save(); }  

		return true;
	}
}
