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
const productoModel_js_1 = require("../models/productoModel.js");
const database_1 = require("../database");
const db = database_1.Database.Instance();
const ProdModel = db.DB.connection.model('productos', productoModel_js_1.ProductSchema);
const ProductController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const producto = new ProdModel({
            nombre: 'Lol',
            descripcion: 'bebida',
            familia: 'bebida',
            precioVenta: 0.55,
            precioCompra: 0.40,
            IVA: 0,
            EAN: 'Lol',
            alta: false,
            tag: 'res',
            cantidad: 0
        });
        let prodAddedCorrectly = yield db.AddProduct(producto, ProdModel);
        if (prodAddedCorrectly) {
            res.status(200);
            res.send({ message: `El producto ${producto.get('nombre')} ha sido añadido en la base de datos`, });
        }
        else {
            res.status(200);
            res.send({ message: `Nombre o código de barras repetido`, });
        }
    }),
    findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send({ message: "opsie findAll" });
    }),
    findOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send({ message: "opsie findOne" });
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send({ message: "opsie update" });
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send({ message: "opsie delete" });
    }),
    deleteAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send({ message: "opsie deleteAll" });
    }),
    findAllPublished: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.send({ message: "opsie" });
    })
};
module.exports = ProductController;
