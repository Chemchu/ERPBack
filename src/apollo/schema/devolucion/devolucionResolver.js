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
exports.updateDevolucionResolver = exports.deleteDevolucionResolver = exports.addDevolucionResolver = exports.devolucionesResolver = exports.devolucionResolver = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const apollo_server_express_1 = require("apollo-server-express");
const database_1 = require("../../../databases/database");
const devolucionResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (args === null || !args || Object.keys(args).length === 0 && args.constructor === Object)
        throw new apollo_server_express_1.UserInputError('Argumentos inválidos: Find no puede estar vacío');
    const db = database_1.Database.Instance();
    if (args._id) {
        const venta = yield db.DevolucionDBController.CollectionModel.findOne({ _id: args._id }).exec();
        if (venta)
            return venta;
    }
    return null;
});
exports.devolucionResolver = devolucionResolver;
const devolucionesResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const db = database_1.Database.Instance();
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) {
        let order = "desc";
        if (args.order) {
            order = args.order;
        }
        const devoluciones = yield db.DevolucionDBController.CollectionModel.find({}).sort({ createdAt: order }).limit(args.limit || 500).skip(args.offset || 0).exec();
        if (devoluciones)
            return devoluciones;
    }
    if (((_a = args.find) === null || _a === void 0 ? void 0 : _a.createdAt) && args.find.tpv) {
        let order = "desc";
        if (args.order) {
            order = args.order;
        }
        const devoluciones = yield db.DevolucionDBController.CollectionModel.find({ tpv: args.find.tpv, "createdAt": { $gte: parseInt(args.find.createdAt), $lt: Date.now() } })
            .sort({ createdAt: order })
            .limit(args.limit || 500)
            .skip(args.offset || 0)
            .exec();
        if (devoluciones)
            return devoluciones;
    }
    if ((_b = args.find) === null || _b === void 0 ? void 0 : _b._ids) {
        let order = "desc";
        if (args.order) {
            order = args.order;
        }
        const devoluciones = yield db.DevolucionDBController.CollectionModel.find({ _id: args.find._ids })
            .sort({ createdAt: order })
            .limit(args.limit || 500)
            .skip(args.offset || 0)
            .exec();
        if (devoluciones)
            return devoluciones;
    }
    if ((_c = args.find) === null || _c === void 0 ? void 0 : _c.clienteId) {
        let order = "desc";
        if (args.order) {
            order = args.order;
        }
        const devoluciones = yield db.DevolucionDBController.CollectionModel.find({ $cliente: { _id: args.find.clienteId } })
            .sort({ createdAt: order })
            .limit(args.limit || 500)
            .skip(args.offset || 0)
            .exec();
        if (devoluciones)
            return devoluciones;
    }
    if ((_d = args.find) === null || _d === void 0 ? void 0 : _d.vendedorId) {
        let order = "desc";
        if (args.order) {
            order = args.order;
        }
        const devoluciones = yield db.DevolucionDBController.CollectionModel.find({ $trabajador: { _id: args.find.vendedorId } })
            .sort({ createdAt: order })
            .limit(args.limit || 500)
            .skip(args.offset || 0)
            .exec();
        if (devoluciones)
            return devoluciones;
    }
    if ((_e = args.find) === null || _e === void 0 ? void 0 : _e.createdAt) {
        let order = "desc";
        if (args.order) {
            order = args.order;
        }
        const devoluciones = yield db.DevolucionDBController.CollectionModel.find({ createdAt: args.find.createdAt })
            .sort({ createdAt: order })
            .limit(args.limit || 500)
            .skip(args.offset || 0)
            .exec();
        if (devoluciones)
            return devoluciones;
    }
    if ((_f = args.find) === null || _f === void 0 ? void 0 : _f.tpv) {
        let order = "desc";
        if (args.order) {
            order = args.order;
        }
        const devoluciones = yield db.DevolucionDBController.CollectionModel.find({ tpv: args.find.tpv })
            .sort({ createdAt: order })
            .limit(args.limit || 500)
            .skip(args.offset || 0)
            .exec();
        if (devoluciones)
            return devoluciones;
    }
    if (((_g = args.find) === null || _g === void 0 ? void 0 : _g.fechaInicial) && ((_h = args.find) === null || _h === void 0 ? void 0 : _h.fechaFinal) && !args.find.query) {
        let order = "desc";
        if (args.order) {
            order = args.order;
        }
        const devoluciones = yield db.DevolucionDBController.CollectionModel.find({
            "createdAt": {
                $gte: new Date(Number(args.find.fechaInicial)),
                $lt: new Date(Number(args.find.fechaFinal))
            }
        })
            .sort({ createdAt: order })
            .limit(args.limit || 500)
            .skip(args.offset || 0)
            .exec();
        if (devoluciones)
            return devoluciones;
    }
    if ((_j = args.find) === null || _j === void 0 ? void 0 : _j.query) {
        const query = args.find.query;
        const isQueryValidId = mongoose_1.default.Types.ObjectId.isValid(query);
        let devoluciones = [];
        if (isQueryValidId) {
            devoluciones = yield db.DevolucionDBController.CollectionModel.find({ _id: query })
                .limit(args.limit || 150)
                .exec();
            return devoluciones;
        }
        let queryConFecha = [{}];
        let limite = args.limit || 150;
        if (args.find.fechaInicial && args.find.fechaFinal) {
            queryConFecha = [{
                    "createdAt": {
                        $gte: new Date(Number(args.find.fechaInicial)),
                        $lt: new Date(Number(args.find.fechaFinal))
                    }
                }];
            limite = 1000;
        }
        const tpv = yield db.TPVDBController.CollectionModel.findOne({ nombre: { "$regex": query, "$options": "i" } });
        if (tpv) {
            const r = yield db.DevolucionDBController.CollectionModel.find({
                tpv: tpv._id,
                "createdAt": {
                    $gte: new Date(Number(args.find.fechaInicial)),
                    $lt: new Date(Number(args.find.fechaFinal))
                }
            })
                .limit(args.limit || 150)
                .exec();
            return [...r];
        }
        devoluciones = yield db.DevolucionDBController.CollectionModel.find({
            $or: [
                { "productos.nombre": { "$regex": query, "$options": "i" } },
                { "productos.ean": { "$regex": query, "$options": "i" } },
                { "productos.proveedor": { "$regex": query, "$options": "i" } },
                { "productos.familia": { "$regex": query, "$options": "i" } },
                { "trabajador.nombre": { "$regex": query, "$options": "i" } },
                { "trabajador.email": { "$regex": query, "$options": "i" } },
                { "trabajador.dni": { "$regex": query, "$options": "i" } },
                { "trabajador.rol": { "$regex": query, "$options": "i" } },
                { "modificadoPor.nombre": { "$regex": query, "$options": "i" } },
                { "modificadoPor.email": { "$regex": query, "$options": "i" } },
                { "modificadoPor.dni": { "$regex": query, "$options": "i" } },
                { "modificadoPor.rol": { "$regex": query, "$options": "i" } },
                { "cliente.nombre": { "$regex": query, "$options": "i" } },
                { "cliente.nif": { "$regex": query, "$options": "i" } }
            ],
            $and: queryConFecha,
        })
            .limit(limite)
            .sort({ "createdAt": -1 })
            .exec();
        return devoluciones;
    }
    return [];
});
exports.devolucionesResolver = devolucionesResolver;
const addDevolucionResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    try {
        const db = database_1.Database.Instance();
        const cliente = yield db.ClientDBController.CollectionModel.findOne({ "_id": args.fields.cliente });
        const trabajador = yield db.EmployeeDBController.CollectionModel.findOne({ "_id": args.fields.trabajador });
        const ventaOriginal = yield db.VentasDBController.CollectionModel.findOne({ "_id": args.fields.ventaId });
        const devolucionToAdd = new db.DevolucionDBController.CollectionModel({
            productosDevueltos: args.fields.productosDevueltos,
            dineroDevuelto: args.fields.dineroDevuelto,
            cliente: cliente,
            trabajador: trabajador,
            modificadoPor: trabajador,
            tpv: args.fields.tpv,
            ventaId: args.fields.ventaId,
            ventaOriginal: ventaOriginal
        });
        const res = yield devolucionToAdd.save();
        const prodMap = new Map();
        let isUpdatingCorrectly = true;
        args.fields.productosDevueltos.forEach((p) => __awaiter(void 0, void 0, void 0, function* () {
            prodMap.set(p._id, p.cantidadDevuelta);
            const err1 = yield db.ProductDBController.CollectionModel.findOneAndUpdate({ _id: p._id }, { "$inc": { "cantidad": +p.cantidadDevuelta } });
            if ((err1 === null || err1 === void 0 ? void 0 : err1.errors) && isUpdatingCorrectly) {
                isUpdatingCorrectly = false;
            }
        }));
        const updatedProductList = [];
        (_k = ventaOriginal === null || ventaOriginal === void 0 ? void 0 : ventaOriginal.productos) === null || _k === void 0 ? void 0 : _k.forEach((prod) => {
            let p = prod;
            const cantidadDevuelta = prodMap.get(prod._id);
            if (cantidadDevuelta) {
                p.cantidadVendida -= cantidadDevuelta;
                updatedProductList.push(p);
            }
        });
        yield db.VentasDBController.CollectionModel.updateOne({ "_id": args.fields.ventaId }, { "productos": updatedProductList });
        if (res.errors) {
            return { message: "No se ha podido añadir la devolución a la base de datos", successful: false };
        }
        if (!isUpdatingCorrectly) {
            return { message: "Devolución añadida pero las cantidades no han sido actualizadas correctamente", successful: true };
        }
        return { message: "Devolución añadida con éxito", successful: true, _id: res._id, createdAt: res.createdAt };
    }
    catch (err) {
        return { message: err, successful: false };
    }
});
exports.addDevolucionResolver = addDevolucionResolver;
const deleteDevolucionResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
});
exports.deleteDevolucionResolver = deleteDevolucionResolver;
const updateDevolucionResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const db = database_1.Database.Instance();
});
exports.updateDevolucionResolver = updateDevolucionResolver;
