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
exports.clientesResolver = exports.clienteResolver = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const database_1 = require("../../../databases/database");
const clienteResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (args === null || !args || Object.keys(args).length === 0 && args.constructor === Object)
        throw new apollo_server_express_1.UserInputError('Argumentos inválidos: Find no puede estar vacío');
    const db = database_1.Database.Instance();
    if (args.find._id) {
        const c = yield db.ClientDBController.CollectionModel.findOne({ _id: args.find._id }).exec();
        if (c)
            return c;
    }
    if (args.find.nif) {
        const c = yield db.ClientDBController.CollectionModel.findOne({ nif: args.find.nif }).exec();
        if (c)
            return c;
    }
    if (args.find.nombre) {
        const c = yield db.ClientDBController.CollectionModel.findOne({ nombre: { "$regex": args.find.nombre, "$options": "i" } }).exec();
        if (c)
            return c;
    }
    return null;
});
exports.clienteResolver = clienteResolver;
const clientesResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const db = database_1.Database.Instance();
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) {
        const clientes = yield db.ClientDBController.CollectionModel.find({}).limit(args.limit || 3000).exec();
        if (clientes)
            return clientes;
    }
    if ((_a = args.find) === null || _a === void 0 ? void 0 : _a._id) {
        const clientes = yield db.ClientDBController.CollectionModel.find({ _id: args.find._id })
            .limit(args.limit || 3000)
            .exec();
        if (clientes)
            return clientes;
    }
    if ((_b = args.find) === null || _b === void 0 ? void 0 : _b.nif) {
        const clientes = yield db.ClientDBController.CollectionModel.find({ nif: args.find.nif })
            .limit(args.limit || 3000)
            .exec();
        if (clientes)
            return clientes;
    }
    if ((_c = args.find) === null || _c === void 0 ? void 0 : _c.nombre) {
        const clientes = yield db.ClientDBController.CollectionModel.find({ nombre: args.find.nombre })
            .limit(args.limit || 3000)
            .exec();
        if (clientes)
            return clientes;
    }
    return [];
});
exports.clientesResolver = clientesResolver;
