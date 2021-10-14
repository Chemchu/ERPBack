import { Request, Response } from 'express';
import { Database } from '../databaseLogic/database';

const db = Database.Instance();

const ProductController = {
    create: async (req : Request, res : Response) => {   
        // Añade el producto en la db
        res = await db.ProductDBController.Add(req, res);
        res.send();
    },

    findAll: async (req : Request, res : Response) => {
        res = await db.ProductDBController.GetAll(res);
        res.send();
    },

    find: async (req : Request, res : Response) => {
        res = await db.ProductDBController.Get(req, res);
        res.send();
    },

    update: async (req : Request, res : Response) => {
        res = await db.ProductDBController.Update(req, res);
        res.send();
    },

    delete: async(req : Request, res : Response) => {
        res = await db.ProductDBController.Remove(req, res);
        res.send();
    },
}

module.exports = ProductController;