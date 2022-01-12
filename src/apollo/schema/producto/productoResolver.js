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
exports.productosResolver = exports.productoResolver = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const database_1 = require("../../../databases/database");
const productoResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!args.find._id && !args.find.nombre && !args.find.ean)
        throw new apollo_server_express_1.UserInputError('Argumentos inválidos: Find no puede estar vacío');
    const db = database_1.Database.Instance();
    if (args.find._id) {
        const producto = yield db.ProductDBController.CollectionModel.findOne({ _id: args.find._id }).exec();
        if (producto)
            return producto;
    }
    if (args.find.nombre) {
        const producto = yield db.ProductDBController.CollectionModel.findOne({ nombre: args.find.nombre }).exec();
        if (producto)
            return producto;
    }
    if (args.find.ean) {
        const producto = yield db.ProductDBController.CollectionModel.findOne({ ean: args.find.ean }).exec();
        if (producto)
            return producto;
    }
    return null;
});
exports.productoResolver = productoResolver;
const productosResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const db = database_1.Database.Instance();
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) {
        const productos = yield db.ProductDBController.CollectionModel.find({})
            .limit(args.limit || 3000)
            .exec();
        if (productos)
            return productos;
    }
    if ((_a = args.find) === null || _a === void 0 ? void 0 : _a._id) {
        const productos = yield db.ProductDBController.CollectionModel.find({ _id: args.find._id })
            .limit(args.limit || 3000)
            .exec();
        if (productos)
            return productos;
    }
    if ((_b = args.find) === null || _b === void 0 ? void 0 : _b.nombre) {
        const productos = yield db.ProductDBController.CollectionModel.find({ nombre: { "$regex": args.find.nombre, "$options": "i" } })
            .limit(args.limit || 3000)
            .exec();
        if (productos)
            return productos;
    }
    if ((_c = args.find) === null || _c === void 0 ? void 0 : _c.familia) {
        const productos = yield db.ProductDBController.CollectionModel.find({ familia: { "$regex": args.find.familia, "$options": "i" } })
            .limit(args.limit || 3000)
            .exec();
        if (productos)
            return productos;
    }
    if ((_d = args.find) === null || _d === void 0 ? void 0 : _d.proveedor) {
        const productos = yield db.ProductDBController.CollectionModel.find({ proveedor: { "$regex": args.find.proveedor, "$options": "i" } })
            .limit(args.limit || 3000)
            .exec();
        if (productos)
            return productos;
    }
    return [];
});
exports.productosResolver = productosResolver;