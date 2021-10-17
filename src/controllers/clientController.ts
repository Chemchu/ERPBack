import { Request, Response } from 'express';
import { Database } from '../databaseLogic/database';

const db = Database.Instance();

const ClientController = {
    create: async (req : Request, res : Response) => {   
        await db.ClientDBController.Add(req, res);
    },

    findAll: async (req : Request, res : Response) => {
        await db.ClientDBController.GetAll(res);
    },

    findOne: async (req : Request, res : Response) => {
        await db.ClientDBController.Get(req, res);
    },

    update: async (req : Request, res : Response) => {
        await db.ClientDBController.Update(req, res);
    },

    delete: async(req : Request, res : Response) => {
        await db.ClientDBController.Remove(req, res);
    },
}

module.exports = ClientController;