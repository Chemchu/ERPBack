import { Request, Response } from 'express';
import { Database } from '../databaseLogic/database';

const db = Database.Instance();

const ProductController = {
    create: async (req : Request, res : Response) => {   
        // Añade el producto en la db
        await db.ProductDBController.Add(req, res);
    },

    findAll: async (req : Request, res : Response) => {
        await db.ProductDBController.GetAll(res);
    },

    find: async (req : Request, res : Response) => {
        await db.ProductDBController.Get(req, res);
    },

    update: async (req : Request, res : Response) => {
        await db.ProductDBController.Update(req, res);
    },

    delete: async(req : Request, res : Response) => {
        await db.ProductDBController.Remove(req, res);
    },
}

module.exports = ProductController;