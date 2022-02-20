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
const EmployeeDBController_1 = require("./EmployeeDBController");
const employeeModel_1 = require("../models/employeeModel");
const CierreTPVDBController_1 = require("./CierreTPVDBController");
const cierreTPVModel_1 = require("../models/cierreTPVModel");
const tpvModel_1 = require("../models/tpvModel");
const TPVDBController_1 = require("./TPVDBController");
mongoose.Promise = global.Promise;
dotenv.config();
const dbInformation = {
    mongo: mongoose,
    url: process.env.MONGO_URI === "" ? "mongodb://localhost:27017/" : process.env.MONGO_URI,
    dbName: process.env.DATABASE_NAME == "" ? "erp_db" : process.env.DATABASE_NAME,
};
class Database {
    constructor() {
        this.db = dbInformation.mongo;
        this.ProductDBController = new ProductDBController_1.ProductoDBController(new productoModel_1.Producto().Model);
        this.VentasDBController = new SaleDBController_1.SaleDBController(new ventaModel_1.Venta().Model);
        this.ClientDBController = new ClientDBController_1.ClientDBController(new clienteModel_1.Cliente().Model);
        this.EmployeeDBController = new EmployeeDBController_1.EmployeeDBController(new employeeModel_1.Empleado().Model);
        this.CierreTPVDBController = new CierreTPVDBController_1.CierreTPVDBController(new cierreTPVModel_1.CierreTPV().Model);
        this.TPVDBController = new TPVDBController_1.TPVDBController(new tpvModel_1.TPV().Model);
        this.db.connect(dbInformation.url + dbInformation.dbName).then(() => {
            console.log("¡Conexión realizada con la base de datos!");
        }).catch((err) => {
            console.log("¡No se pudo realizar la conexión con la base de datos!", err);
            process.exit();
        }).then(() => {
            this.ClientDBController.CollectionModel.findOne({ nombre: "General" }).exec().then((clienteGeneral) => {
                if (!clienteGeneral) {
                    const cliente = { nombre: "General", calle: "", nif: "", cp: "" };
                    this.ClientDBController.CollectionModel.create(cliente);
                }
            });
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
