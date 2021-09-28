"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var productoModel_1 = require("./models/productoModel");
var dotenv = require("dotenv");
dotenv.config();
mongoose.Promise = global.Promise;
var db = {
    mongoose: mongoose,
    url: process.env.MONGO_URI,
    productos: productoModel_1.default
};
module.exports = db;
