import mongoose = require('mongoose');
import dotenv = require('dotenv');
import { Producto } from './models/productoModel';
import { Cliente } from './models/clienteModel';
import { Venta } from './models/ventaModel';
import { ErrorRequestHandler } from 'express';

mongoose.Promise = global.Promise;
		
dotenv.config();

let prod = new Producto();
let cliente = new Cliente();
let venta = new Venta();

const db : any = {
	mongo : mongoose,
	url: process.env.MONGO_URI == "" ? "mongodb://localhost/" : process.env.MONGO_URI,
	dbName : process.env.DATABASE_NAME == "" ? "erp_db" : process.env.DATABASE_NAME,
	productosCollection : prod.Model,
	clientesCollection : cliente.Model,
	ventasCollection : venta.Model
};

export class Database {
    private static instance: Database;
	private dbInformation: any;
	public dbMongoose : mongoose.Mongoose;

    private constructor () {
		this.dbInformation = db;

		this.dbInformation.mongo.connect(this.dbInformation.url + this.dbInformation.dbName, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Connected to the database!");
        }).catch((err: ErrorRequestHandler) => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });
		
		this.dbMongoose = db.mongo;
    }

    public static Instance(): Database  {
		if(!this.instance) {
			this.instance = new Database();
		}
		
		return this.instance;
    }
}
