"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_js_1 = require("../database.js");
const db = database_js_1.Database.Instance().dbMongoose;
exports.create = (req, res) => {
    res.send({ message: "opsie" });
    const prod = {
        nombre: 'Coca-cola',
        descripcion: 'bebida',
        familia: 'bebida',
        precioVenta: 0.55,
        precioCompra: 0.40,
        IVA: 0,
        EAN: ['jeje'],
        alta: false,
        tag: 'res',
    };
    db.connection.collection('productos').insertOne(prod);
};
exports.findAll = (req, res) => {
    res.send({ message: "opsie doopsie" });
};
exports.findOne = (req, res) => {
    res.send({ message: "opsie" });
};
exports.update = (req, res) => {
    res.send({ message: "opsie" });
};
exports.delete = (req, res) => {
    res.send({ message: "opsie" });
};
exports.deleteAll = (req, res) => {
    res.send({ message: "opsie" });
};
exports.findAllPublished = (req, res) => {
    res.send({ message: "opsie" });
};
