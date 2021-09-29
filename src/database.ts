import mongoose = require('mongoose');
import dotenv = require('dotenv');
import { Producto } from './models/productoModel';

dotenv.config();

mongoose.Promise = global.Promise;

let prod = new Producto();
const db = 
{
	mongoose : mongoose,
	url: process.env.MONGO_URI == "" ? "mongodb://localhost/" : process.env.MONGO_URI,
	dbName : process.env.DATABASE_NAME == "" ? "erp_db" : process.env.DATABASE_NAME,
	initialCollection : prod.Model
};

module.exports = db;