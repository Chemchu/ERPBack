import { Request, Response } from 'express';
import { Database } from '../databaseLogic/database';

const db = Database.Instance();

const SessionController = {
    authenticate: async (req : Request, res : Response) => {   
        await db.EmployeeDBController.Authenticate(req, res);
    },

    logout: async (req : Request, res : Response) => {
        await db.EmployeeDBController.GetAll(res);
    },

    restoreSession: async (req : Request, res : Response) => {
        await db.EmployeeDBController.Get(req, res);
    }
}

module.exports = SessionController;