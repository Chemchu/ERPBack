import { Request, Response } from 'express';
import { Database } from '../databases/database';
import { getLogger } from "log4js";

const logger = getLogger();
logger.level = "debug";

const db = Database.Instance();

const ClientController = {
    create: async (req: Request, res: Response) => {
        logger.info("CLIENT-REQUEST: Se intenta crear un nuevo cliente");
        await db.ClientDBController.Add(req, res);
    },

    findAll: async (req: Request, res: Response) => {
        logger.info("CLIENT-REQUEST: Petición de todos los clientes");
        await db.ClientDBController.GetAll(res);
    },

    find: async (req: Request, res: Response) => {
        logger.info("CLIENT-REQUEST: Petición de un solo cliente");
        await db.ClientDBController.Get(req, res);
    },

    getState: async (req: Request, res: Response) => {
        logger.info("CLIENT-REQUEST: Petición del estado de los clientes");
        await db.ClientDBController.GetDBState(req, res);
    },

    update: async (req: Request, res: Response) => {
        logger.info("CLIENT-REQUEST: Actualización de cliente");
        await db.ClientDBController.Update(req, res);
    },

    delete: async (req: Request, res: Response) => {
        logger.info("CLIENT-REQUEST: Borrado de cliente");
        await db.ClientDBController.Remove(req, res);
    },
}

module.exports = ClientController;