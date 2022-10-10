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
exports.updateMermaResolver = exports.deleteMermaResolver = exports.addMermaResolver = exports.mermasResolver = exports.mermaResolver = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../../../databases/database");
const mermaResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!args.find._id)
        throw new apollo_server_express_1.UserInputError('Argumentos inválidos: Find no puede estar vacío');
    const db = database_1.Database.Instance();
    if (args.find._id) {
        const merma = yield db.MermaDBController.CollectionModel.findOne({ _id: args.find._id }).exec();
        if (merma)
            return merma;
    }
    return null;
});
exports.mermaResolver = mermaResolver;
const mermasResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const db = database_1.Database.Instance();
    let order = "desc";
    if ((_a = args.find) === null || _a === void 0 ? void 0 : _a.empleadoId) {
        const mermas = yield db.MermaDBController.CollectionModel.find({ "creadoPor._id": args.find.empleadoId })
            .limit(args.limit || 150)
            .exec();
        return mermas;
    }
    if (((_b = args.find) === null || _b === void 0 ? void 0 : _b.fechaFinal) && ((_c = args.find) === null || _c === void 0 ? void 0 : _c.fechaFinal)) {
        const mermas = yield db.MermaDBController.CollectionModel.find({
            "createdAt": {
                $gte: new Date(Number(args.find.fechaInicial)),
                $lt: new Date(Number(args.find.fechaFinal))
            }
        })
            .sort({ createdAt: order })
            .limit(args.limit || 1000)
            .exec();
        if (mermas)
            return mermas;
    }
    return yield db.MermaDBController.CollectionModel.find()
        .sort({ createdAt: order })
        .limit(args.limit || 150)
        .exec();
});
exports.mermasResolver = mermasResolver;
const addMermaResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = database_1.Database.Instance();
        const empleado = yield db.EmployeeDBController.CollectionModel.findOne({ _id: args.merma.empleadoId });
        if (empleado === null) {
            return { message: "El empleado no existe en el sistema", successful: false };
        }
        const costes = yield CalcularMermaValues(args.merma.productos);
        const productosMermados = yield GetProductosMermados(args.merma.productos);
        const merma = {
            productos: productosMermados,
            creadoPor: empleado,
            costeProductos: costes.costeProductos,
            ventasPerdidas: costes.ventas,
            beneficioPerdido: costes.beneficio
        };
        const updatedProduct = new db.MermaDBController.CollectionModel(merma);
        const resultado = yield updatedProduct.save();
        if (resultado.id) {
            return { message: "Merma añadido correctamente", successful: true, };
        }
        return { message: "No se ha podido añadir el merma", successful: false };
    }
    catch (err) {
        return { message: err, successful: false };
    }
});
exports.addMermaResolver = addMermaResolver;
const deleteMermaResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = database_1.Database.Instance();
        const isQueryValidId = mongoose_1.default.Types.ObjectId.isValid(args._id);
        if (!isQueryValidId) {
            return { message: "ID de merma inválido", successful: false };
        }
        const deletedProd = yield db.MermaDBController.CollectionModel.deleteOne({ _id: args._id });
        if (deletedProd.deletedCount > 0) {
            return { message: "merma eliminado correctamente", successful: true };
        }
        return { message: "No se ha podido eliminar el merma", successful: false };
    }
    catch (err) {
        return { message: err, successful: false };
    }
});
exports.deleteMermaResolver = deleteMermaResolver;
const updateMermaResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = database_1.Database.Instance();
        const isQueryValidId = mongoose_1.default.Types.ObjectId.isValid(args.input._id);
        if (!isQueryValidId) {
            return { message: "ID de merma inválido", successful: false };
        }
        const empleado = yield db.EmployeeDBController.CollectionModel.findOne({ _id: args.input.merma.empleadoId });
        if (empleado === null) {
            return { message: "El empleado no existe en el sistema", successful: false };
        }
        const mermaVieja = yield db.MermaDBController.CollectionModel.findOne({ _id: args.input._id });
        if (!mermaVieja) {
            return { message: "La merma a actualizar no existe en el sistema", successful: false };
        }
        const costes = yield CalcularMermaValues(args.input.merma.productos);
        const productosMermados = yield GetProductosMermados(args.input.merma.productos);
        const updatedMerma = {
            productos: productosMermados,
            creadoPor: args.input.merma.empleadoId,
            costeProductos: costes.costeProductos,
            ventasPerdidas: costes.ventas,
            beneficioPerdido: costes.beneficio,
        };
        const resultadoUpdate = yield db.MermaDBController.CollectionModel.updateOne({ _id: args.input._id }, { $set: updatedMerma });
        if (resultadoUpdate.modifiedCount > 0) {
            return { message: "Merma actualizada correctamente", successful: true };
        }
        return { message: "No se ha podido actualizar el merma", successful: false };
    }
    catch (err) {
        return { message: err, successful: false };
    }
});
exports.updateMermaResolver = updateMermaResolver;
const CalcularMermaValues = (productosMermados) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
    const prodMap = new Map();
    yield db.ProductDBController.CollectionModel
        .find()
        .cursor()
        .eachAsync(prod => {
        prodMap.set(prod._id, prod);
    });
    let costes = { costeProductos: 0, ventas: 0, beneficio: 0 };
    for (let index = 0; index < productosMermados.length; index++) {
        const prodMermado = productosMermados[index];
        const producto = prodMap.get(prodMermado._id);
        if (!producto) {
            throw "El producto añadido a la merma no existe en el sistema";
        }
        costes.costeProductos += producto.precioCompra * prodMermado.cantidad;
        costes.ventas += producto.precioVenta * prodMermado.cantidad;
        costes.beneficio += ((producto.precioVenta / (1 + (producto.iva / 100))) - producto.precioCompra) * prodMermado.cantidad;
    }
    return costes;
});
const GetProductosMermados = (productosMermados) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
    const prodMap = new Map();
    yield db.ProductDBController.CollectionModel
        .find()
        .cursor()
        .eachAsync(prod => {
        prodMap.set(prod._id, prod);
    });
    let resultado = [];
    for (let index = 0; index < productosMermados.length; index++) {
        const productoMermado = productosMermados[index];
        const prod = prodMap.get(productoMermado._id);
        if (!prod) {
            throw "El producto añadido a la merma no existe en el sistema";
        }
        const pRes = {
            nombre: prod.nombre,
            proveedor: prod.proveedor,
            cantidad: prod.cantidad,
            familia: prod.familia,
            margen: prod.margen,
            ean: prod.ean,
            iva: prod.iva,
            precioCompra: prod.precioCompra,
            precioVenta: prod.precioVenta,
            motivo: productoMermado.motivo,
        };
        resultado.push(pRes);
    }
    return resultado;
});
