import mongoose = require('mongoose');
import dotenv = require('dotenv');
import { Producto } from './models/productoModel';
import { Cliente } from './models/clienteModel';
import { Venta } from './models/ventaModel';

dotenv.config();

mongoose.Promise = global.Promise;

let prod = new Producto();
let cliente = new Cliente();
let venta = new Venta();

const db = 
{
	mongoose : mongoose,
	url: process.env.MONGO_URI == "" ? "mongodb://localhost/" : process.env.MONGO_URI,
	dbName : process.env.DATABASE_NAME == "" ? "erp_db" : process.env.DATABASE_NAME,
	productsCollection : prod.Model,
	clientesCollection : cliente.Model,
	ventasCollection : venta.Model
};

module.exports = db;