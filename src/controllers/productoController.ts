import { Request, Response } from 'express';
import { Database } from '../database';

const db = Database.Instance();
//const ProdModel: Model<IProduct> = db.MongooseInstance.connection.model('productos', ProductSchema);

const ProductController = {
    create: async (req : Request, res : Response) => {   
        // Añade el producto en la db
        let prodAddedCorrectly = await db.AddProduct(req);

        if(prodAddedCorrectly){
            res.status(200);
            res.send({message: 'Producto añadido'});
        }
        else {
            res.status(200);
            res.send({message: 'Nombre o código de barras repetido'});
        }
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