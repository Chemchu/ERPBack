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
exports.updateCierreTpvResolver = exports.deleteCierreTpvResolver = exports.addCierreTpvResolver = exports.cierreTpvsResolver = exports.cierreTpvResolver = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const database_1 = require("../../../databases/database");
const cierreTpvResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!args.find.nombre && !args.find._id)
        throw new apollo_server_express_1.UserInputError('Argumentos inválidos: Find no puede estar vacío');
    const db = database_1.Database.Instance();
    if (args.find.nombre) {
        return yield db.TPVDBController.CollectionModel.findOne({ nombre: args.find.nombre }).exec();
    }
    return yield db.TPVDBController.CollectionModel.findOne({ _id: args.find._id }).exec();
});
exports.cierreTpvResolver = cierreTpvResolver;
const cierreTpvsResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) {
        const tpv = yield db.TPVDBController.CollectionModel.find({})
            .limit(150)
            .exec();
        return tpv;
    }
    if (args.find) {
        const tpv = yield db.TPVDBController.CollectionModel.find({ abierta: args.find.libre })
            .limit(150)
            .exec();
        return tpv;
    }
    return [];
});
exports.cierreTpvsResolver = cierreTpvsResolver;
const addCierreTpvResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
    console.log("AddCierreTPVResolver: ");
    console.log(args);
});
exports.addCierreTpvResolver = addCierreTpvResolver;
const deleteCierreTpvResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
});
exports.deleteCierreTpvResolver = deleteCierreTpvResolver;
const updateCierreTpvResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
});
exports.updateCierreTpvResolver = updateCierreTpvResolver;
