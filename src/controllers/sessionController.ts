import { Request, Response } from 'express';
import { Database } from '../databases/database';
import { getLogger } from "log4js";

const logger = getLogger();
logger.level = "debug";

const db = Database.Instance();

const SessionController = {
    authenticate: async (req: Request, res: Response) => {
        logger.info("SESSION-REQUEST: Se intenta iniciar sesión (autenticar)");
        await db.EmployeeDBController.Authenticate(req, res);
    },
}

module.exports = SessionController;