import { Database } from '../database.js';
import { Request, Response } from 'express';
import { IProduct } from '../models/productoModel.js';

const db = Database.Instance().dbMongoose;

// Create and Save a new Producto
exports.create = (req : Request, res : Response) => {
    res.send({message: "opsie"});

    const prod: IProduct = {
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

// Retrieve all Producto from the database.
exports.findAll = (req : Request, res : Response) => {
    res.send({message: "opsie doopsie"});
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