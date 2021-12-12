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
exports.EmployeeDBController = void 0;
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
class EmployeeDBController {
    constructor(modelo) {
        this.CollectionModel = modelo;
    }
    Add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeJSON = req.body;
            let hashedPassword = yield bcrypt.hash(employeeJSON.password, salt);
            const employeeToAdd = new this.CollectionModel({
                nombre: employeeJSON.nombre,
                apellidos: employeeJSON.apellidos,
                dni: employeeJSON.dni,
                genero: employeeJSON.genero,
                email: employeeJSON.email,
                hashPassword: hashedPassword,
                horasPorSemana: employeeJSON.horasPorSemana,
                fechaAlta: employeeJSON.fechaAlta,
                diasLibresDisponibles: employeeJSON.diasLibresDisponibles
            });
            try {
                const empleadoExistente = yield this.CollectionModel.exists({ dni: employeeJSON.dni });
                if (empleadoExistente) {
                    res.status(200).json({ message: `Error al añadir el empleado en la base de datos: el empleado ya existe`, success: false });
                    return;
                }
                yield employeeToAdd.save();
                res.status(200).json({ message: `El empleado ha sido añadido en la base de datos`, success: true });
            }
            catch (err) {
                res.status(500).json({ message: `Error al añadir el empleado en la base de datos: ${err}`, success: false });
            }
        });
    }
    GetAll(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeArr = yield this.CollectionModel.find({});
                res.status(200).json({ message: employeeArr, success: true });
            }
            catch (err) {
                res.status(500).json({ message: `Error al buscar los empleados: ${err}`, success: false });
            }
        });
    }
    Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeAttr = req.params.id;
                const employees = yield this.CollectionModel.find({
                    $or: [{ 'nombre': { $regex: employeeAttr, $options: "i" } }, { 'apellidos': { $regex: employeeAttr, $options: "i" } }, { 'dni': { $regex: employeeAttr, $options: "i" } }]
                }).exec();
                res.status(200).json({ message: employees, success: true });
            }
            catch (err) {
                res.status(500).json({ message: `Error al buscar los empleados: ${err}`, success: false });
            }
        });
    }
    GetDBState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const databaseState = yield this.CollectionModel.find({ "databaseState": { $ne: null } });
                res.status(200).json({ message: databaseState, success: true });
            }
            catch (err) {
                res.status(500).json({ message: `Error al buscar el databaseState: ${err}`, success: false });
            }
        });
    }
    Authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employeeJSON = req.body;
                const employeeToAuthenticate = yield this.CollectionModel.findOne({
                    email: employeeJSON.email
                }).exec();
                if (!employeeToAuthenticate) {
                    res.status(200).json({ message: "Nombre de usuario o contraseña incorrecto", success: false });
                    return;
                }
                let doesPasswordsMatch = yield bcrypt.compare(employeeJSON.password, employeeToAuthenticate === null || employeeToAuthenticate === void 0 ? void 0 : employeeToAuthenticate.hashPassword);
                if (doesPasswordsMatch)
                    res.status(200).json({ message: "Autenticado con éxito", success: true });
                else
                    res.status(200).json({ message: "Fallo en la autenticación", success: false });
            }
            catch (err) {
                res.status(500).json({ message: `Error al autenticar: ${err}`, success: false });
            }
        });
    }
    Remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeName = req.params.id;
            try {
                const employeeDeleted = yield this.CollectionModel.deleteOne({ nombre: employeeName });
                if (employeeDeleted.deletedCount > 0) {
                    res.status(200).json({ message: `El empleado ${employeeName} ha sido borrado correctamente de la base de datos`, success: true });
                    return;
                }
                res.status(200).json({ message: `Error al borrar ${employeeName} de la base de datos: el empleado no existe`, success: false });
            }
            catch (err) {
                res.status(500).json({ message: `Error al borrar ${employeeName} de la base de datos: ${err}`, success: false });
            }
        });
    }
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeToUpdate = req.params.id;
            try {
                const employeeJSON = req.body;
                let hashedPassword = yield bcrypt.hash(employeeJSON.password, salt);
                const employeeUpdated = yield this.CollectionModel.updateOne({ nombre: employeeToUpdate }, {
                    nombre: employeeJSON.nombre,
                    apellidos: employeeJSON.apellidos,
                    dni: employeeJSON.dni,
                    genero: employeeJSON.genero,
                    email: employeeJSON.email,
                    hashPassword: hashedPassword,
                    horasPorSemana: employeeJSON.horasPorSemana,
                    fechaAlta: employeeJSON.fechaAlta,
                    diasLibresDisponibles: employeeJSON.diasLibresDisponibles
                });
                if (employeeUpdated.modifiedCount > 0) {
                    res.status(200).json({ message: `El empleado ${employeeToUpdate} ha sido actualizado correctamente`, success: true });
                    return;
                }
                res.status(200).json({ message: `Error al actualizar ${employeeToUpdate} en la base de datos: el empleado no existe`, success: false });
            }
            catch (err) {
                res.status(500).json({ message: `Error al actualizar ${employeeToUpdate} en la base de datos: ${err}`, success: false });
            }
        });
    }
}
exports.EmployeeDBController = EmployeeDBController;
