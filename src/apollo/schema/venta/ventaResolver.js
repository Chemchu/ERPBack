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
exports.ventasResolver = exports.ventaResolver = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const database_1 = require("../../../databases/database");
const ventaResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (args === null || !args || Object.keys(args).length === 0 && args.constructor === Object)
        throw new apollo_server_express_1.UserInputError('Argumentos inválidos: Find no puede estar vacío');
    const db = database_1.Database.Instance();
    if (args._id) {
        const venta = yield db.VentasDBController.CollectionModel.findOne({ _id: args._id }).exec();
        if (venta)
            return venta;
    }
    return null;
});
exports.ventaResolver = ventaResolver;
const ventasResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const db = database_1.Database.Instance();
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) {
        const ventas = yield db.VentasDBController.CollectionModel.find({}).sort({ createdAt: args.order || "desc" }).limit(args.limit || 3000).skip(args.offset || 0).exec();
        if (ventas)
            return ventas;
    }
    if ((_a = args.find) === null || _a === void 0 ? void 0 : _a._ids) {
        const ventas = yield db.VentasDBController.CollectionModel.find({ _id: args.find._ids })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 3000)
            .skip(args.offset || 0)
            .exec();
        if (ventas)
            return ventas;
    }
    if ((_b = args.find) === null || _b === void 0 ? void 0 : _b.clienteId) {
        const ventas = yield db.VentasDBController.CollectionModel.find({ cliente: args.find.clienteId })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 3000)
            .skip(args.offset || 0)
            .exec();
        if (ventas)
            return ventas;
    }
    if ((_c = args.find) === null || _c === void 0 ? void 0 : _c.tipo) {
        const ventas = yield db.VentasDBController.CollectionModel.find({ tipo: args.find.tipo })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 3000)
            .skip(args.offset || 0)
            .exec();
        if (ventas)
            return ventas;
    }
    if ((_d = args.find) === null || _d === void 0 ? void 0 : _d.vendedorId) {
        const ventas = yield db.VentasDBController.CollectionModel.find({ vendidoPor: args.find.vendedorId })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 3000)
            .skip(args.offset || 0)
            .exec();
        if (ventas)
            return ventas;
    }
    if ((_e = args.find) === null || _e === void 0 ? void 0 : _e.createdAt) {
        const ventas = yield db.VentasDBController.CollectionModel.find({ createdAt: args.find.createdAt })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 3000)
            .skip(args.offset || 0)
            .exec();
        if (ventas)
            return ventas;
    }
    return [];
});
exports.ventasResolver = ventasResolver;
