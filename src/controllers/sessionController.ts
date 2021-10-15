import { Request, Response } from 'express';
import { Database } from '../databaseLogic/database';

const db = Database.Instance();

const SessionController = {
    authenticate: async (req : Request, res : Response) => {   
        res = await db.EmployeeDBController.Add(req, res);
        return res;
    },

    logout: async (req : Request, res : Response) => {
        res = await db.EmployeeDBController.GetAll(res);
        return res;
    },

    restoreSession: async (req : Request, res : Response) => {
        res = await db.EmployeeDBController.Get(req, res);
        return res;
    }
}

module.exports = SessionController;