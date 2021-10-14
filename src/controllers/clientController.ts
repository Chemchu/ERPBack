import { Request, Response } from 'express';
import { Database } from '../databaseLogic/database';

const db = Database.Instance();

const ClientController = {
    create: async (req : Request, res : Response) => {   
        res = await db.ClientDBController.Add(req, res);
        return res;
    },

    findAll: async (req : Request, res : Response) => {
        res = await db.ClientDBController.GetAll(res);
        return res;
    },

    findOne: async (req : Request, res : Response) => {
        res = await db.ClientDBController.Get(req, res);
        return res;
    },

    update: async (req : Request, res : Response) => {
        res = await db.ClientDBController.Update(req, res);
        return res;
    },

    delete: async(req : Request, res : Response) => {
        res = await db.ClientDBController.Remove(req, res);
        return res;
    },
}

module.exports = ClientController;