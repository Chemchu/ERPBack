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
const database_1 = require("../databaseLogic/database");
const db = database_1.Database.Instance();
const ProductController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.ProductDBController.Add(req, res);
    }),
    findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.ProductDBController.GetAll(res);
    }),
    find: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.ProductDBController.Get(req, res);
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.ProductDBController.Update(req, res);
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.ProductDBController.Remove(req, res);
    }),
};
module.exports = ProductController;
