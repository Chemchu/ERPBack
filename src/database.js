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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productoModel_1 = require("./models/productoModel");
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
    productosCollection: productoModel_1.Producto,
    clientesCollection: cliente.Model,
    ventasCollection: venta.Model
};
class Database {
    constructor() {
        this.db = dbInformation.mongo;
        this.ProductModel = new productoModel_1.Producto().Model;
        this.ClientModel = new clienteModel_1.Cliente().Model;
        this.VentasModel = new ventaModel_1.Venta().Model;
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
    get MongooseInstance() {
        return this.db;
    }
    AddProduct(prodReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const prodJSON = prodReq.body;
            const productoToAdd = new this.ProductModel({
                nombre: prodJSON.nombre,
                descripcion: prodJSON.descripcion,
                familia: prodJSON.familia,
                precioVenta: prodJSON.precioVenta,
                precioCompra: prodJSON.precioCompra,
                IVA: prodJSON.IVA,
                EAN: prodJSON.EAN,
                alta: prodJSON.alta,
                tags: prodJSON.tags,
                cantidad: prodJSON.cantidad
            });
            const prodName = productoToAdd.get('nombre');
            const prodEAN = productoToAdd.get('EAN');
            console.log(`Nombre: ${prodName}`);
            console.log(`EAN: ${prodEAN}`);
            var yaExisteProducto = yield this.ProductModel.exists({ nombre: prodName });
            var yaExisteEAN = yield this.ProductModel.exists({ EAN: prodEAN });
            if (yaExisteProducto || yaExisteEAN) {
                console.log(`Nombre o código de barras repetido`);
                return false;
            }
            else {
                productoToAdd.save();
                console.log(`El producto ${prodName} ha sido añadido en la base de datos`);
            }
            return true;
        });
    }
    AddSale(saleReq) {
        return __awaiter(this, void 0, void 0, function* () {
            const saleJSON = saleReq.body;
            const saleToAdd = new this.VentasModel({
                Productos: saleJSON.productos,
                PrecioVentaTotal: saleJSON.precioVentaTotal,
                Cliente: saleJSON.cliente,
            });
            const ventaID = saleToAdd.get('_id');
            console.log(`ID: ${ventaID}`);
            saleToAdd.save(function (err) {
                if (err) {
                    console.log(`La venta no se ha podido añadir`);
                    return false;
                }
                else {
                    console.log(`La venta ha sido añadido en la base de datos`);
                }
            });
            return true;
        });
    }
    RemoveProduct(productoToRemove, prodModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const prodName = productoToRemove.get('nombre');
            const prodEAN = productoToRemove.get('EAN');
            console.log(`Nombre: ${prodName}`);
            console.log(`EAN: ${prodEAN}`);
            var yaExisteProducto = yield prodModel.exists({ nombre: prodName });
            var yaExisteEAN = yield prodModel.exists({ EAN: prodEAN });
            if (yaExisteProducto || yaExisteEAN)
                return false;
            else {
                productoToRemove.save();
            }
            return true;
        });
    }
    UpdateProduct(productoToUpdate, prodModel) {
        return __awaiter(this, void 0, void 0, function* () {
            const prodName = productoToUpdate.get('nombre');
            const prodEAN = productoToUpdate.get('EAN');
            console.log(`Nombre: ${prodName}`);
            console.log(`EAN: ${prodEAN}`);
            var yaExisteProducto = yield prodModel.exists({ nombre: prodName });
            var yaExisteEAN = yield prodModel.exists({ EAN: prodEAN });
            if (yaExisteProducto || yaExisteEAN)
                return false;
            else {
                productoToUpdate.save();
            }
            return true;
        });
    }
}
exports.Database = Database;
