import mongoose = require('mongoose');
import ProductoModel from './models/productoModel';
import dotenv = require('dotenv');

dotenv.config();

mongoose.Promise = global.Promise;

const db = 
{
	mongoose : mongoose,
	url: process.env.MONGO_URI == "" ? "mongodb://localhost/" : process.env.MONGO_URI,
	dbName : process.env.DATABASE_NAME == "" ? "erp_db" : process.env.DATABASE_NAME,
	initialCollection : ProductoModel
};

module.exports = db;