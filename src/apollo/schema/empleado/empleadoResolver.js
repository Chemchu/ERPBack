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
exports.updateEmpleadoResolver = exports.deleteEmpleadoResolver = exports.addEmpleadoResolver = exports.empleadosResolver = exports.empleadoResolver = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const database_1 = require("../../../databases/database");
const empleadoResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object)
        throw new apollo_server_express_1.UserInputError('Argumentos inválidos: Find no puede estar vacío');
    const db = database_1.Database.Instance();
    if (args.find._id) {
        const e = yield db.EmployeeDBController.CollectionModel.findOne({ _id: args.find._id }).exec();
        if (e)
            return e;
    }
    if (args.find.dni) {
        const e = yield db.EmployeeDBController.CollectionModel.findOne({ dni: args.find.dni }).exec();
        if (e)
            return e;
    }
    if (args.find.nombre) {
        const e = yield db.EmployeeDBController.CollectionModel.findOne({ nombre: { "$regex": args.find.nombre, "$options": "i" } }).exec();
        if (e)
            return e;
    }
    return null;
});
exports.empleadoResolver = empleadoResolver;
const empleadosResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const db = database_1.Database.Instance();
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) {
        const empleados = yield db.EmployeeDBController.CollectionModel.find({}).limit(args.limit || 3000).exec();
        if (empleados)
            return empleados;
    }
    if ((_a = args.find) === null || _a === void 0 ? void 0 : _a._ids) {
        const empleados = yield db.EmployeeDBController.CollectionModel.find({ _id: args.find._ids })
            .limit(args.limit || 3000)
            .exec();
        if (empleados)
            return empleados;
    }
    if ((_b = args.find) === null || _b === void 0 ? void 0 : _b.nombre) {
        const empleados = yield db.EmployeeDBController.CollectionModel.find({ nombre: args.find.nombre })
            .limit(args.limit || 3000)
            .exec();
        if (empleados)
            return empleados;
    }
    if ((_c = args.find) === null || _c === void 0 ? void 0 : _c.rol) {
        const empleados = yield db.EmployeeDBController.CollectionModel.find({ rol: args.find.rol })
            .limit(args.limit || 3000)
            .exec();
        if (empleados)
            return empleados;
    }
    return [];
});
exports.empleadosResolver = empleadosResolver;
const addEmpleadoResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
});
exports.addEmpleadoResolver = addEmpleadoResolver;
const deleteEmpleadoResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
});
exports.deleteEmpleadoResolver = deleteEmpleadoResolver;
const updateEmpleadoResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
});
exports.updateEmpleadoResolver = updateEmpleadoResolver;
