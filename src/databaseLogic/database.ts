import mongoose = require('mongoose');
import dotenv = require('dotenv');
import { Producto } from '../models/productoModel';
import { Venta } from '../models/ventaModel';
import { ErrorRequestHandler } from 'express';
import { Cliente } from '../models/clienteModel';
import { ProductoDBController } from './ProductDBController';
import { ClientDBController } from './ClientDBController';
import { SaleDBController } from './SaleDBController';

mongoose.Promise = global.Promise;
		
dotenv.config();

let producto = new Producto();
let venta = new Venta();
let cliente = new Cliente();

const dbInformation : any = {
	mongo : mongoose,
	url: process.env.MONGO_URI == "" ? "mongodb://localhost:27017/" : process.env.MONGO_URI,
	dbName : process.env.DATABASE_NAME == "" ? "erp_db" : process.env.DATABASE_NAME,
	productosCollection : producto.Model,
	ventasCollection : venta.Model,
	clientesCollection : cliente.Model,
};

export class Database {
    private static instance: Database;
	private db: mongoose.Mongoose;

	public ProductDBController : ProductoDBController;
	public VentasDBController : SaleDBController; 
	public ClientDBController : ClientDBController;

    private constructor () {
		this.db = dbInformation.mongo;

		this.ProductDBController = new ProductoDBController(dbInformation.productosCollection);
		this.VentasDBController = new SaleDBController(dbInformation.ventasCollection);
		this.ClientDBController = new ClientDBController(dbInformation.clientesCollection);

		this.db.connect(dbInformation.url + dbInformation.dbName).then(() => {
            console.log("¡Conexión realizada con la base de datos!");
        }).catch((err: ErrorRequestHandler) => {
            console.log("¡No se pudo realizar la conexión con la base de datos!", err);
            process.exit();
        });

    }

    public static Instance(): Database  {
		if(!this.instance) {
			this.instance = new Database();
		}
		return this.instance;
    }

	public get MongooseInstance(): mongoose.Mongoose {
		return this.db;
	}
}
