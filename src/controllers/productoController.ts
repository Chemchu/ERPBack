import { Request, Response } from 'express';
import { ProductSchema } from '../models/productoModel.js';
import { Database } from '../database';
import { Document, Model } from 'mongoose';
import { IProduct } from '../types/Producto.js';

const db = Database.Instance();
const ProdModel: Model<IProduct> = db.DB.connection.model('productos', ProductSchema);

const ProductController = {
    create: async (req : Request, res : Response) => {        
        // Crea el producto
		const producto: Document<IProduct> = new ProdModel({
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

        // Añade el producto en la db
        let prodAddedCorrectly = await db.AddProduct(producto, ProdModel);

        if(prodAddedCorrectly){
            res.status(200);
            res.send({message: `El producto ${producto.get('nombre')} ha sido añadido en la base de datos`, });
        }
        else {
            res.status(200);
            res.send({message: `Nombre o código de barras repetido`, });
        }
    },

    findAll: async (req : Request, res : Response) => {
        res.send({message: "opsie findAll"});
    },

    findOne: async (req : Request, res : Response) => {
        res.send({message: "opsie findOne"});
    },

    update: async (req : Request, res : Response) => {
        res.send({message: "opsie update"});
    },

    delete: async(req : Request, res : Response) => {
        res.send({message: "opsie delete"});
    },

    deleteAll: async (req : Request, res : Response) => {
        res.send({message: "opsie deleteAll"});
    },

    findAllPublished: async (req : Request, res : Response) => {
        res.send({message: "opsie"});
    }
}

module.exports = ProductController;