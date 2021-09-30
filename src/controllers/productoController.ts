const db = require("../database");
import { Request, Response } from 'express';
const Productos = db.productos;

// Create and Save a new Producto
exports.create = (req : Request, res : Response) => {
    res.send({message: "opsie"});
};

// Retrieve all Producto from the database.
exports.findAll = (req : Request, res : Response) => {
    res.send({message: "opsie"});
};

// Find a single Producto with an id
exports.findOne = (req : Request, res : Response) => {
    res.send({message: "opsie"});
};

// Update a Producto by the id in the request
exports.update = (req : Request, res : Response) => {
    res.send({message: "opsie"});
};

// Delete a Producto with the specified id in the request
exports.delete = (req : Request, res : Response) => {
    res.send({message: "opsie"});
};

// Delete all Producto from the database.
exports.deleteAll = (req : Request, res : Response) => {
    res.send({message: "opsie"});
};

// Find all published Producto
exports.findAllPublished = (req : Request, res : Response) => {
    res.send({message: "opsie"});
};