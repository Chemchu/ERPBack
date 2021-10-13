import { Request, Response } from 'express';
import { Database } from '../database';

const db = Database.Instance();
//const ProdModel: Model<IProduct> = db.MongooseInstance.connection.model('productos', ProductSchema);

const ProductController = {
    create: async (req : Request, res : Response) => {   
        // Añade el producto en la db
        res = await db.AddProduct(req, res);
        res.send();
    },

    findAll: async (req : Request, res : Response) => {
        let allProducts = await db.GetAllProducts();
        res.send({message: allProducts});
    },

    find: async (req : Request, res : Response) => {
        let product = await db.GetProduct(req.params.id);

        res.send({message: product});
    },

    update: async (req : Request, res : Response) => {
        res.send({message: "opsie update"});
    },

    delete: async(req : Request, res : Response) => {
        res = await db.RemoveProduct(req.params.id, res);
        res.send();
    },

    deleteAll: async (req : Request, res : Response) => {
        res.send({message: "opsie deleteAll"});
    },

    findAllPublished: async (req : Request, res : Response) => {
        res.send({message: "opsie"});
    }
}

module.exports = ProductController;