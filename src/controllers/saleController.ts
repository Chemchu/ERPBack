import { Request, Response } from 'express';
import { Database } from '../databases/database';
import { getLogger } from "log4js";

const logger = getLogger();
logger.level = "debug";

const db = Database.Instance();

const SaleController = {
    create: async (req: Request, res: Response) => {
        logger.info("SALE-REQUEST: Se intenta crear una venta");
        await db.VentasDBController.Add(req, res);
    },

    findAll: async (req: Request, res: Response) => {
        logger.info("SALE-REQUEST: Petición de todas las ventas");
        await db.VentasDBController.GetAll(res);
    },

    find: async (req: Request, res: Response) => {
        logger.info("SALE-REQUEST: Petición de una sola venta");
        await db.VentasDBController.Get(req, res);
    },

    getState: async (req: Request, res: Response) => {
        logger.info("SALE-REQUEST: Petición del estado de las ventas");
        await db.ProductDBController.Get(req, res);
    },

    update: async (req: Request, res: Response) => {
        logger.info("SALE-REQUEST: Actualización de venta");
        await db.VentasDBController.Update(req, res);
    },

    delete: async (req: Request, res: Response) => {
        logger.info("SALE-REQUEST: Borrado de venta");
        await db.VentasDBController.Remove(req, res);
    }
}

module.exports = SaleController;