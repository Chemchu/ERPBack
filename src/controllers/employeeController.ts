import { Request, Response } from 'express';
import { Database } from '../databases/database';
import { getLogger } from "log4js";

const logger = getLogger();
logger.level = "debug";

const db = Database.Instance();

const EmployeeController = {
    create: async (req: Request, res: Response) => {
        logger.info("EMPLOYEE-REQUEST: Se intenta crear un empleado");
        await db.EmployeeDBController.Add(req, res);
    },

    findAll: async (req: Request, res: Response) => {
        logger.info("EMPLOYEE-REQUEST: Petición de todos los empleados");
        await db.EmployeeDBController.GetAll(res);
    },

    find: async (req: Request, res: Response) => {
        logger.info("EMPLOYEE-REQUEST: Petición de un solo empleado");
        await db.EmployeeDBController.Get(req, res);
    },

    getState: async (req: Request, res: Response) => {
        logger.info("EMPLOYEE-REQUEST: Petición del estado de los empleados");
        await db.EmployeeDBController.GetDBState(req, res);
    },

    update: async (req: Request, res: Response) => {
        logger.info("EMPLOYEE-REQUEST: Actualización de empleado");
        await db.EmployeeDBController.Update(req, res);
    },

    delete: async (req: Request, res: Response) => {
        logger.info("EMPLOYEE-REQUEST: Borrado de empleado");
        await db.EmployeeDBController.Remove(req, res);
    }
}

module.exports = EmployeeController;