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
const SessionController = {
    authenticate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res = yield db.EmployeeDBController.Authenticate(req, res);
        return res;
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res = yield db.EmployeeDBController.GetAll(res);
        return res;
    }),
    restoreSession: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res = yield db.EmployeeDBController.Get(req, res);
        return res;
    })
};
module.exports = SessionController;
