import { Request, Response } from 'express';
import { Database } from '../databases/database';

const db = Database.Instance();

const ClientController = {
    create: async (req: Request, res: Response) => {
        await db.ClientDBController.Add(req, res);
    },

    findAll: async (req: Request, res: Response) => {
        await db.ClientDBController.GetAll(res);
    },

    find: async (req: Request, res: Response) => {
        await db.ClientDBController.Get(req, res);
    },

    getState: async (req: Request, res: Response) => {
        await db.ClientDBController.GetDBState(req, res);
    },

    update: async (req: Request, res: Response) => {
        await db.ClientDBController.Update(req, res);
    },

    delete: async (req: Request, res: Response) => {
        await db.ClientDBController.Remove(req, res);
    },
}

module.exports = ClientController;