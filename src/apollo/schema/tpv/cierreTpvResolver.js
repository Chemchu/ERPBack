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
exports.updateCierreTpvResolver = exports.deleteCierreTpvResolver = exports.addCierreTpvResolver = exports.cierreTpvsResolver = exports.cierreTpvResolver = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const database_1 = require("../../../databases/database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
        const cierres = yield db.CierreTPVDBController.CollectionModel.find({})
            .limit(args.limit)
            .sort({ 'updatedAt': "-1" })
            .exec();
        return cierres;
    }
    if (args.find) {
        const fecha = new Date(args.find.fecha);
        const cierres = yield db.CierreTPVDBController.CollectionModel.find({ apertura: fecha })
            .limit(args.limit || 3000)
            .sort({ 'updatedAt': "-1" })
            .exec();
        return cierres;
    }
    return [];
});
exports.cierreTpvsResolver = cierreTpvsResolver;
const addCierreTpvResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return {
            message: "Clave privada JWT no encontrada",
            successful: false,
            token: ""
        };
    }
    const db = database_1.Database.Instance();
    const tpv = yield db.TPVDBController.CollectionModel.findOne({ _id: args.cierre.tpv, libre: false }).exec();
    if (!tpv) {
        return {
            message: "Este empleado no está usando esta TPV en este momento",
            successful: false,
            token: ""
        };
    }
    const fechaApertura = new Date().setTime(Number(args.cierre.apertura));
    const fechaActual = Date.now();
    const ventas = yield db.VentasDBController.CollectionModel.find({ "createdAt": { $gte: fechaApertura, $lt: fechaActual } }).exec();
    const productosVendidos = ventas.map(v => v.productos).flat();
    let beneficio = productosVendidos.reduce((total, p) => {
        return total += p.margen;
    }, 0);
    const res = yield db.CierreTPVDBController.CollectionModel.create({
        tpv: args.cierre.tpv,
        abiertoPor: args.cierre.abiertoPor,
        cerradoPor: args.cierre.cerradoPor,
        apertura: fechaApertura,
        cierre: fechaActual,
        cajaInicial: args.cierre.cajaInicial,
        numVentas: args.cierre.numVentas,
        dineroEsperadoEnCaja: args.cierre.dineroEsperadoEnCaja,
        dineroRealEnCaja: args.cierre.dineroRealEnCaja,
        ventasEfectivo: args.cierre.ventasEfectivo,
        ventasTarjeta: args.cierre.ventasTarjeta,
        ventasTotales: args.cierre.ventasTotales,
        dineroRetirado: args.cierre.dineroRetirado,
        fondoDeCaja: args.cierre.fondoDeCaja,
        beneficio: beneficio,
        nota: args.cierre.nota || ""
    });
    if (res.errors) {
        return {
            message: "No se ha podido añadir el cierre de caja",
            successful: false,
            token: ""
        };
    }
    let payload;
    payload = { _id: args.cierre.abiertoPor._id, nombre: args.cierre.abiertoPor.nombre, apellidos: args.cierre.abiertoPor.apellidos, email: args.cierre.abiertoPor.email, rol: args.cierre.abiertoPor.rol };
    const jwtHoursDuration = process.env.JWT_HOURS_DURATION || 1;
    const token = yield jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: 3600 * Number(jwtHoursDuration)
    });
    const tpvUpdated = yield db.TPVDBController.CollectionModel.updateOne({ _id: tpv._id }, {
        libre: true
    });
    if (!tpvUpdated.acknowledged) {
        return {
            message: "No se ha podido liberar la TPV",
            successful: false,
            token: ""
        };
    }
    return {
        message: "Cierre añadido correctamenete",
        successful: true,
        token: `Bearer ${token}`
    };
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
