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
const database_1 = require("../../../databases/database");
const productoResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
    const producto = yield db.ProductDBController.CollectionModel.findOne({ _id: args._id }).exec();
    if (producto) {
        return producto;
    }
    return null;
});
exports.productoResolver = productoResolver;
const productosResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
    const productos = yield db.ProductDBController.CollectionModel.find({ nombre: args.find.nombre }).exec();
    if (productos) {
        return productos;
    }
    return null;
});
exports.productosResolver = productosResolver;
