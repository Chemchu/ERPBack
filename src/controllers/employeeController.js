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
const EmployeeController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res = yield db.EmployeeDBController.Add(req, res);
        return res;
    }),
    findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res = yield db.EmployeeDBController.GetAll(res);
        return res;
    }),
    findOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res = yield db.EmployeeDBController.Get(req, res);
        return res;
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res = yield db.EmployeeDBController.Update(req, res);
        return res;
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res = yield db.EmployeeDBController.Remove(req, res);
        return res;
    })
};
module.exports = EmployeeController;
