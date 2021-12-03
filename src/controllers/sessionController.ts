import { Request, Response } from 'express';
import { Database } from '../databases/database';
import { getLogger } from "log4js";

const logger = getLogger();
logger.level = "debug";

const db = Database.Instance();

const SessionController = {
    authenticate: async (req : Request, res : Response) => {   
        logger.info("SESSION-REQUEST: Se intenta iniciar sesión (autenticar)");
        await db.EmployeeDBController.Authenticate(req, res);
    },

    logout: async (req : Request, res : Response) => {
        logger.info("SESSION-REQUEST: Se intenta cerrar sesión");
        await db.EmployeeDBController.GetAll(res);
    },

    restoreSession: async (req : Request, res : Response) => {
        logger.info("SESSION-REQUEST: Se intenta restaurar sesión");
        await db.EmployeeDBController.Get(req, res);
    }
}

module.exports = SessionController;