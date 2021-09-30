"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productoModel_1 = require("./models/productoModel");
const clienteModel_1 = require("./models/clienteModel");
const ventaModel_1 = require("./models/ventaModel");
mongoose.Promise = global.Promise;
dotenv.config();
let prod = new productoModel_1.Producto();
let cliente = new clienteModel_1.Cliente();
let venta = new ventaModel_1.Venta();
const db = {
    mongo: mongoose,
    url: process.env.MONGO_URI == "" ? "mongodb://localhost/" : process.env.MONGO_URI,
    dbName: process.env.DATABASE_NAME == "" ? "erp_db" : process.env.DATABASE_NAME,
    productosCollection: prod.Model,
    clientesCollection: cliente.Model,
    ventasCollection: venta.Model
};
class Database {
    constructor() {
        this.dbInformation = db;
        this.dbInformation.mongo.connect(this.dbInformation.url + this.dbInformation.dbName, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Connected to the database!");
        }).catch((err) => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });
    }
    static Instance() {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }
}
exports.Database = Database;
