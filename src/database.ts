import mongoose = require('mongoose');
import Producto from './models/productoModel';
import dotenv = require('dotenv');

dotenv.config();

mongoose.Promise = global.Promise;

const db = 
{
	mongoose : mongoose,
	url: process.env.MONGO_URI!,
	productos : Producto
};

module.exports = db;