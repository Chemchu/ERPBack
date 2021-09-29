"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var productoModel_1 = require("./models/productoModel");
dotenv.config();
mongoose.Promise = global.Promise;
var prod = new productoModel_1.Producto();
var db = {
    mongoose: mongoose,
    url: process.env.MONGO_URI == "" ? "mongodb://localhost/" : process.env.MONGO_URI,
    dbName: process.env.DATABASE_NAME == "" ? "erp_db" : process.env.DATABASE_NAME,
    initialCollection: prod.Model
};
module.exports = db;
