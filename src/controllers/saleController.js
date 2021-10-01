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
const SaleController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let saleAddedCorrectly = yield db.AddSale(req);
        if (saleAddedCorrectly) {
            res.status(200);
            res.send({ message: 'Venta añadido' });
        }
        else {
            res.status(200);
            res.send({ message: 'La venta no se ha podido añadir a la base de datos' });
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
module.exports = SaleController;
