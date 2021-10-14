import { Request, Response } from 'express';
import { Database } from '../databaseLogic/database';

const db = Database.Instance();
//const ProdModel: Model<IProduct> = db.MongooseInstance.connection.model('productos', ProductSchema);

const ProductController = {
    create: async (req : Request, res : Response) => {   
        // Añade el producto en la db
        res = await db.AddProduct(req, res);
        res.send();
    },

    findAll: async (req : Request, res : Response) => {
        res = await db.GetAllProducts(res);
        res.send();
    },

    find: async (req : Request, res : Response) => {
        res = await db.GetProducts(req.params.id, res);
        res.send();
    },

    update: async (req : Request, res : Response) => {
        res = await db.UpdateProduct(req.params.id, req, res);
        res.send();
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