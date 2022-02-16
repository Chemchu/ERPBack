import { Request, Response } from 'express';
import { Database } from '../databases/database';
const db = Database.Instance();

const SessionController = {
    authenticate: async (req: Request, res: Response) => {
        await db.EmployeeDBController.Authenticate(req, res);
    },
}

module.exports = SessionController;