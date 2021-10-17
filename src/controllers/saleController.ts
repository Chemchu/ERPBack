import { Request, Response } from 'express';
import { Database } from '../databases/database';

const db = Database.Instance();

const SaleController = {
    create: async (req : Request, res : Response) => {   
        await db.VentasDBController.Add(req, res);
    },

    findAll: async (req : Request, res : Response) => {
        await db.VentasDBController.GetAll(res);
    },

    findOne: async (req : Request, res : Response) => {
        await db.VentasDBController.Get(req, res);
    },

    update: async (req : Request, res : Response) => {
        await db.VentasDBController.Update(req, res);
    },

    delete: async(req : Request, res : Response) => {
        await db.VentasDBController.Remove(req, res);
    }
}

module.exports = SaleController;