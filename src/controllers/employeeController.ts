import { Request, Response } from 'express';
import { Database } from '../databases/database';

const db = Database.Instance();

const EmployeeController = {
    create: async (req: Request, res: Response) => {
        await db.EmployeeDBController.Add(req, res);
    },

    findAll: async (req: Request, res: Response) => {
        await db.EmployeeDBController.GetAll(res);
    },

    find: async (req: Request, res: Response) => {
        await db.EmployeeDBController.Get(req, res);
    },

    getState: async (req: Request, res: Response) => {
        await db.EmployeeDBController.GetDBState(req, res);
    },

    update: async (req: Request, res: Response) => {

        await db.EmployeeDBController.Update(req, res);
    },

    delete: async (req: Request, res: Response) => {

        await db.EmployeeDBController.Remove(req, res);
    }
}

module.exports = EmployeeController;