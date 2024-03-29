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
exports.updateEmpleadoResolver = exports.deleteEmpleadoResolver = exports.addEmpleadoResolver = exports.empleadosResolver = exports.empleadoResolver = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../../../databases/database");
const empleadoResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (args.find === null ||
        !args.find ||
        (Object.keys(args.find).length === 0 && args.find.constructor === Object))
        throw new apollo_server_express_1.UserInputError("Argumentos inválidos: Find no puede estar vacío");
    const db = database_1.Database.Instance();
    if (args.find._id) {
        let e = yield db.EmployeeDBController.CollectionModel.findOne({
            _id: args.find._id,
        }).exec();
        if (e) {
            e.hashPassword = "undefined";
            return e;
        }
    }
    if (args.find.dni) {
        let e = yield db.EmployeeDBController.CollectionModel.findOne({
            dni: args.find.dni,
        }).exec();
        if (e) {
            e.hashPassword = "undefined";
            return e;
        }
    }
    if (args.find.nombre) {
        let e = yield db.EmployeeDBController.CollectionModel.findOne({
            nombre: { $regex: args.find.nombre, $options: "i" },
        }).exec();
        if (e) {
            e.hashPassword = "undefined";
            return e;
        }
    }
    return null;
});
exports.empleadoResolver = empleadoResolver;
const empleadosResolver = (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    const db = database_1.Database.Instance();
    if (args.find === null ||
        !args.find ||
        (Object.keys(args.find).length === 0 && args.find.constructor === Object)) {
        let empleados = yield db.EmployeeDBController.CollectionModel.find({})
            .limit(args.limit || 3000)
            .exec();
        if (empleados) {
            empleados.forEach((e) => {
                e.hashPassword = "undefined";
            });
            return empleados;
        }
    }
    if ((_a = args.find) === null || _a === void 0 ? void 0 : _a._ids) {
        let empleados = yield db.EmployeeDBController.CollectionModel.find({
            _id: args.find._ids,
        })
            .limit(args.limit || 3000)
            .exec();
        if (empleados) {
            empleados.forEach((e) => {
                e.hashPassword = "undefined";
            });
            return empleados;
        }
    }
    if ((_b = args.find) === null || _b === void 0 ? void 0 : _b.nombre) {
        let empleados = yield db.EmployeeDBController.CollectionModel.find({
            nombre: args.find.nombre,
        })
            .limit(args.limit || 3000)
            .exec();
        if (empleados) {
            empleados.forEach((e) => {
                e.hashPassword = "undefined";
            });
            return empleados;
        }
    }
    if ((_c = args.find) === null || _c === void 0 ? void 0 : _c.rol) {
        let empleados = yield db.EmployeeDBController.CollectionModel.find({
            rol: args.find.rol,
        })
            .limit(args.limit || 3000)
            .exec();
        if (empleados) {
            empleados.forEach((e) => {
                e.hashPassword = "undefined";
            });
            return empleados;
        }
    }
    if ((_d = args.find) === null || _d === void 0 ? void 0 : _d.query) {
        const query = args.find.query;
        const isQueryValidId = mongoose_1.default.Types.ObjectId.isValid(query);
        let empleados = {};
        if (isQueryValidId) {
            empleados = yield db.EmployeeDBController.CollectionModel.find({
                _id: query,
            })
                .limit(args.limit || 150)
                .exec();
        }
        else {
            empleados = yield db.EmployeeDBController.CollectionModel.find({
                $or: [
                    { nombre: { $regex: query, $options: "i" } },
                    { apellidos: { $regex: query, $options: "i" } },
                    { rol: { $regex: query, $options: "i" } },
                    { email: { $regex: String(query).toLowerCase(), $options: "i" } },
                ],
            })
                .limit(args.limit || 150)
                .exec();
        }
        return empleados;
    }
    if (((_e = args.find) === null || _e === void 0 ? void 0 : _e.isLibre) !== null && ((_f = args.find) === null || _f === void 0 ? void 0 : _f.isLibre) !== undefined) {
        let empleados = yield db.EmployeeDBController.CollectionModel.find({})
            .limit(args.limit || 3000)
            .exec();
        const empleadosMap = new Map();
        for (let index = 0; index < empleados.length; index++) {
            const empleado = empleados[index];
            if (empleadosMap.has(empleado._id)) {
                continue;
            }
            empleadosMap.set(empleado._id.valueOf(), empleado);
        }
        let empleadosRes = [];
        let tpvs = yield db.TPVDBController.CollectionModel.find({ libre: false });
        for (let index = 0; index < tpvs.length; index++) {
            const tpv = tpvs[index];
            if (args.find.isLibre) {
                empleadosMap.delete(tpv.enUsoPor._id.valueOf());
            }
            else {
                const empleado = empleados.find((emp) => emp._id.valueOf() === tpv.enUsoPor._id.valueOf());
                if (!empleado) {
                    continue;
                }
                empleadosRes.push(empleado);
            }
        }
        if (args.find.isLibre) {
            empleadosRes = Array.from(empleadosMap.values());
        }
        if (empleadosRes) {
            empleadosRes.forEach((e) => {
                e.hashPassword = "undefined";
            });
            return empleadosRes;
        }
    }
    return [];
});
exports.empleadosResolver = empleadosResolver;
const addEmpleadoResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = database_1.Database.Instance();
        const fecha = new Date(Date.now());
        const Empleado = {
            nombre: args.empleadoInput.nombre,
            apellidos: args.empleadoInput.apellidos,
            dni: args.empleadoInput.dni,
            rol: args.empleadoInput.rol,
            email: String(args.empleadoInput.email).toLowerCase(),
            fechaAlta: fecha,
        };
        const empleadoAñadido = yield db.EmployeeDBController.CreateEmployee(Empleado, args.empleadoInput.password);
        if (empleadoAñadido) {
            return { message: "Empleado añadido correctamente", successful: true };
        }
        else {
            return {
                message: "No se ha podido añadir el empleado",
                successful: false,
            };
        }
    }
    catch (err) {
        return {
            message: "Error al añadir el empleado: " + err,
            successful: false,
        };
    }
});
exports.addEmpleadoResolver = addEmpleadoResolver;
const deleteEmpleadoResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = database_1.Database.Instance();
        const res = yield db.EmployeeDBController.CollectionModel.deleteOne({
            _id: args._id,
        });
        if (res.deletedCount > 0) {
            return { message: "Empleado eliminado correctamente", successful: true };
        }
        return {
            message: "No se ha podido eliminar el empleado",
            successful: false,
        };
    }
    catch (err) {
        return { message: "Error al eliminar el empleado", successful: false };
    }
});
exports.deleteEmpleadoResolver = deleteEmpleadoResolver;
const updateEmpleadoResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = database_1.Database.Instance();
        const isQueryValidId = mongoose_1.default.Types.ObjectId.isValid(args._id);
        if (!isQueryValidId) {
            return { message: "ID del empleado inválido", successful: false };
        }
        const updatedEmpleado = {
            _id: args._id,
            nombre: args.empleadoInput.nombre,
            apellidos: args.empleadoInput.apellidos,
            dni: args.empleadoInput.dni,
            rol: args.empleadoInput.rol,
        };
        const actualizadoCorrectamente = yield db.EmployeeDBController.UpdateEmployee(updatedEmpleado, args.empleadoInput.password);
        if (actualizadoCorrectamente) {
            return {
                message: "Empleado actualizado correctamente",
                successful: true,
            };
        }
        return {
            message: "No se ha podido actualizar el empleado",
            successful: false,
        };
    }
    catch (err) {
        return { message: "Error al actualizar el empleado", successful: false };
    }
});
exports.updateEmpleadoResolver = updateEmpleadoResolver;
