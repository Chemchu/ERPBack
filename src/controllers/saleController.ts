import { Request, Response } from 'express';
import { Database } from '../database';

const db = Database.Instance();
//const ProdModel: Model<IProduct> = db.MongooseInstance.connection.model('productos', ProductSchema);

const SaleController = {
    create: async (req : Request, res : Response) => {   
        // Añade el producto en la db
        let saleAddedCorrectly = await db.AddSale(req);

        if(saleAddedCorrectly){
            res.status(200);
            res.send({message: 'Venta añadido'});
        }
        else {
            res.status(200);
            res.send({message: 'La venta no se ha podido añadir a la base de datos'});
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

module.exports = SaleController;