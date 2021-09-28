"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var productoModel_1 = require("./models/productoModel");
var dotenv = require("dotenv");
dotenv.config();
mongoose.Promise = global.Promise;
var db = {
    mongoose: mongoose,
    url: process.env.MONGO_URI == "" ? "mongodb://localhost/" : process.env.MONGO_URI,
    dbName: process.env.DATABASE_NAME == "" ? "erp_db" : process.env.DATABASE_NAME,
    initialCollection: productoModel_1.default
};
module.exports = db;
