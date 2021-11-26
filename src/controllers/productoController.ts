import { Request, Response } from 'express';
import { Database } from '../databases/database';
import { configure, getLogger } from "log4js";

configure("./filename");
const logger = getLogger();
logger.level = "debug";
 
// configure({
//   appenders: { product: { type: "file", filename: "APIRequest_Products.log" } },
//   categories: { default: { appenders: ["products"], level: "error" } }
// });

const db = Database.Instance();

const ProductController = {
    create: async (req : Request, res : Response) => {   
        logger.info("REQUEST: Se intenta crear producto");
        // Añade el producto en la db
        await db.ProductDBController.Add(req, res);
    },

    findAll: async (req : Request, res : Response) => {
        logger.info("REQUEST: Petición de todos los productos");
        await db.ProductDBController.GetAll(res);
    },

    find: async (req : Request, res : Response) => {
        logger.info("REQUEST: Petición de un solo producto");
        await db.ProductDBController.Get(req, res);
    },

    update: async (req : Request, res : Response) => {
        logger.info("REQUEST: Actualización de producto");
        await db.ProductDBController.Update(req, res);
    },

    delete: async(req : Request, res : Response) => {
        logger.info("REQUEST: Borrado de producto");
        await db.ProductDBController.Remove(req, res);
    },
}

module.exports = ProductController;