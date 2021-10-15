import { Request, Response } from 'express';
import { Database } from '../databaseLogic/database';

const db = Database.Instance();

const EmployeeController = {
    create: async (req : Request, res : Response) => {   
        res = await db.EmployeeDBController.Add(req, res);
        return res;
    },

    findAll: async (req : Request, res : Response) => {
        res = await db.EmployeeDBController.GetAll(res);
        return res;
    },

    find: async (req : Request, res : Response) => {
        res = await db.EmployeeDBController.Get(req, res);
        return res;
    },

    update: async (req : Request, res : Response) => {
        res = await db.EmployeeDBController.Update(req, res);
        return res;
    },

    delete: async(req : Request, res : Response) => {
        res = await db.EmployeeDBController.Remove(req, res);
        return res;
    }
}

module.exports = EmployeeController;