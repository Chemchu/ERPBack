"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productoModel_1 = require("./models/productoModel");
const clienteModel_1 = require("./models/clienteModel");
const ventaModel_1 = require("./models/ventaModel");
dotenv.config();
mongoose.Promise = global.Promise;
let prod = new productoModel_1.Producto();
let cliente = new clienteModel_1.Cliente();
let venta = new ventaModel_1.Venta();
const db = {
    mongoose: mongoose,
    url: process.env.MONGO_URI == "" ? "mongodb://localhost/" : process.env.MONGO_URI,
    dbName: process.env.DATABASE_NAME == "" ? "erp_db" : process.env.DATABASE_NAME,
    productsCollection: prod.Model,
    clientesCollection: cliente.Model,
    ventasCollection: venta.Model
};
module.exports = db;
