"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productoModel_1 = require("../models/productoModel");
const ventaModel_1 = require("../models/ventaModel");
const clienteModel_1 = require("../models/clienteModel");
const ProductDBController_1 = require("./ProductDBController");
const ClientDBController_1 = require("./ClientDBController");
const SaleDBController_1 = require("./SaleDBController");
mongoose.Promise = global.Promise;
dotenv.config();
let producto = new productoModel_1.Producto();
let venta = new ventaModel_1.Venta();
let cliente = new clienteModel_1.Cliente();
const dbInformation = {
    mongo: mongoose,
    url: process.env.MONGO_URI == "" ? "mongodb://localhost:27017/" : process.env.MONGO_URI,
    dbName: process.env.DATABASE_NAME == "" ? "erp_db" : process.env.DATABASE_NAME,
    productosCollection: producto.Model,
    ventasCollection: venta.Model,
    clientesCollection: cliente.Model,
};
class Database {
    constructor() {
        this.db = dbInformation.mongo;
        this.ProductDBController = new ProductDBController_1.ProductoDBController(dbInformation.productosCollection);
        this.VentasDBController = new SaleDBController_1.SaleDBController(dbInformation.ventasCollection);
        this.ClientDBController = new ClientDBController_1.ClientDBController(dbInformation.clientesCollection);
        this.db.connect(dbInformation.url + dbInformation.dbName).then(() => {
            console.log("¡Conexión realizada con la base de datos!");
        }).catch((err) => {
            console.log("¡No se pudo realizar la conexión con la base de datos!", err);
            process.exit();
        });
    }
    static Instance() {
        if (!this.instance) {
            this.instance = new Database();
        }
        return this.instance;
    }
    get MongooseInstance() {
        return this.db;
    }
}
exports.Database = Database;
