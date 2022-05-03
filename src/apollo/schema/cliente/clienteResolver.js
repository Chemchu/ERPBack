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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadClienteFileResolver = exports.updateClienteResolver = exports.deleteClienteResolver = exports.addClienteResolver = exports.clientesResolver = exports.clienteResolver = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../../../databases/database");
const clienteResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object)
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
    if ((_a = args.find) === null || _a === void 0 ? void 0 : _a._ids) {
        const clientes = yield db.ClientDBController.CollectionModel.find({ _id: args.find._ids })
            .limit(args.limit || 3000)
            .exec();
        if (clientes)
            return clientes;
    }
    if ((_b = args.find) === null || _b === void 0 ? void 0 : _b.nombre) {
        const clientes = yield db.ClientDBController.CollectionModel.find({ nombre: { "$regex": args.find.nombre, "$options": "i" } })
            .limit(args.limit || 3000)
            .exec();
        if (clientes)
            return clientes;
    }
    if ((_c = args.find) === null || _c === void 0 ? void 0 : _c.query) {
        const query = args.find.query;
        const isQueryValidId = mongoose_1.default.Types.ObjectId.isValid(query);
        let clientes = {};
        if (isQueryValidId) {
            clientes = yield db.ClientDBController.CollectionModel.find({ _id: query })
                .limit(args.limit || 150)
                .exec();
        }
        else {
            clientes = yield db.ClientDBController.CollectionModel.find({
                $or: [
                    { nombre: { "$regex": query, "$options": "i" } },
                    { calle: { "$regex": query, "$options": "i" } },
                    { cp: { "$regex": query, "$options": "i" } },
                    { nif: { "$regex": query, "$options": "i" } }
                ]
            })
                .limit(args.limit || 150)
                .exec();
        }
        return clientes;
    }
    return [];
});
exports.clientesResolver = clientesResolver;
const addClienteResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
});
exports.addClienteResolver = addClienteResolver;
const deleteClienteResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
});
exports.deleteClienteResolver = deleteClienteResolver;
const updateClienteResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
});
exports.updateClienteResolver = updateClienteResolver;
const uploadClienteFileResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
});
exports.uploadClienteFileResolver = uploadClienteFileResolver;
