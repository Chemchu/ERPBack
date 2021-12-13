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
const ClientController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        logger.info("CLIENT-REQUEST: Se intenta crear un nuevo cliente");
        yield db.ClientDBController.Add(req, res);
    }),
    findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        logger.info("CLIENT-REQUEST: Petición de todos los clientes");
        yield db.ClientDBController.GetAll(res);
    }),
    find: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        logger.info("CLIENT-REQUEST: Petición de un solo cliente");
        yield db.ClientDBController.Get(req, res);
    }),
    getState: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        logger.info("CLIENT-REQUEST: Petición del estado de los clientes");
        yield db.ProductDBController.GetDBState(req, res);
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        logger.info("CLIENT-REQUEST: Actualización de cliente");
        yield db.ClientDBController.Update(req, res);
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        logger.info("CLIENT-REQUEST: Borrado de cliente");
        yield db.ClientDBController.Remove(req, res);
    }),
};
module.exports = ClientController;
