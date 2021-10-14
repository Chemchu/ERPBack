import { Request, Response } from 'express';
import { Database } from '../databaseLogic/database';

const db = Database.Instance();

const SaleController = {
    create: async (req : Request, res : Response) => {   
        res = await db.VentasDBController.Add(req, res);
        return res;
    },

    findAll: async (req : Request, res : Response) => {
        res = await db.VentasDBController.GetAll(res);
        return res;
    },

    findOne: async (req : Request, res : Response) => {
        res = await db.VentasDBController.Get(req, res);
        return res;
    },

    update: async (req : Request, res : Response) => {
        res = await db.VentasDBController.Update(req, res);
        return res;
    },

    delete: async(req : Request, res : Response) => {
        res = await db.VentasDBController.Remove(req, res);
        return res;
    }
}

module.exports = SaleController;