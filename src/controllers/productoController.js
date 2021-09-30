"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../database.js");
const mongoose_1 = __importDefault(require("mongoose"));
const conexion = mongoose_1.default.createConnection('mongodb://localhost:27017/erp_db');
exports.create = (req, res) => {
    res.send({ message: "opsie" });
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
