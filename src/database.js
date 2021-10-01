"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productoModel_1 = __importDefault(require("./models/productoModel"));
const clienteModel_1 = require("./models/clienteModel");
const ventaModel_1 = require("./models/ventaModel");
mongoose.Promise = global.Promise;
dotenv.config();
let cliente = new clienteModel_1.Cliente();
let venta = new ventaModel_1.Venta();
const dbInformation = {
    mongo: mongoose,
    url: process.env.MONGO_URI == "" ? "mongodb://localhost:27017/" : process.env.MONGO_URI,
    dbName: process.env.DATABASE_NAME == "" ? "erp_db" : process.env.DATABASE_NAME,
    productosCollection: productoModel_1.default,
    clientesCollection: cliente.Model,
    ventasCollection: venta.Model
};
class Database {
    constructor() {
        this.db = dbInformation.mongo;
        this.db.connect(dbInformation.url + dbInformation.dbName).then(() => {
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
    get DB() {
        return this.db;
    }
    AddProduct(producto, prodModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const prodName = producto.get('nombre');
            const prodEAN = producto.get('EAN');
            console.log(`Nombre: ${prodName}`);
            console.log(`EAN: ${prodEAN}`);
            var yaExisteProducto = yield prodModel.exists({ nombre: prodName });
            var yaExisteEAN = yield prodModel.exists({ EAN: prodEAN });
            if (yaExisteProducto || yaExisteEAN)
                return false;
            else {
                producto.save();
            }
            return true;
        });
    }
}
exports.Database = Database;
