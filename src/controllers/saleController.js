"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../databases/database");
const log4js_1 = require("log4js");
const logger = (0, log4js_1.getLogger)();
logger.level = "debug";
const db = database_1.Database.Instance();
const SaleController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        logger.info("SALE-REQUEST: Se intenta crear una venta");
        yield db.VentasDBController.Add(req, res);
    }),
    findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        logger.info("SALE-REQUEST: Petición de todas las ventas");
        yield db.VentasDBController.GetAll(res);
    }),
    find: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        logger.info("SALE-REQUEST: Petición de una sola venta");
        yield db.VentasDBController.Get(req, res);
    }),
    getState: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        logger.info("SALE-REQUEST: Petición del estado de las ventas");
        yield db.ProductDBController.Get(req, res);
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        logger.info("SALE-REQUEST: Actualización de venta");
        yield db.VentasDBController.Update(req, res);
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        logger.info("SALE-REQUEST: Borrado de venta");
        yield db.VentasDBController.Remove(req, res);
    })
};
module.exports = SaleController;
