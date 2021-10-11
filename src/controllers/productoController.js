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
const database_1 = require("../database");
const db = database_1.Database.Instance();
const ProductController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let prodAddedCorrectly = yield db.AddProduct(req);
        if (prodAddedCorrectly) {
            res.status(200);
            res.send({ message: 'Producto añadido' });
        }
        else {
            res.status(200);
            res.send({ message: 'Nombre o código de barras repetido' });
        }
    }),
    findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let allProducts = yield db.GetAllProducts();
        res.send({ message: allProducts });
    }),
    find: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let product = yield db.GetProduct(req.params.id);
        res.send({ message: product });
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
