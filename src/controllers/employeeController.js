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
const db = database_1.Database.Instance();
const EmployeeController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.EmployeeDBController.Add(req, res);
    }),
    findAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.EmployeeDBController.GetAll(res);
    }),
    find: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.EmployeeDBController.Get(req, res);
    }),
    getState: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.EmployeeDBController.GetDBState(req, res);
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.EmployeeDBController.Update(req, res);
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield db.EmployeeDBController.Remove(req, res);
    })
};
module.exports = EmployeeController;
