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
exports.OldEmployeeDBController = void 0;
class OldEmployeeDBController {
    constructor(modelo) {
        this.CollectionModel = modelo;
    }
    Add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeJSON = req.body;
            if (!employeeJSON.dni) {
                res.status(200).json({ message: `El empleado debe tener un DNI/NIE`, success: false });
                return;
            }
            const employeeToAdd = new this.CollectionModel({
                nombre: employeeJSON.nombre,
                apellidos: employeeJSON.apellidos,
                dni: employeeJSON.dni,
                genero: employeeJSON.genero,
                email: employeeJSON.email,
                fechaBaja: employeeJSON.fechaBaja
            });
            try {
                const empleadoExistente = yield this.CollectionModel.exists({ DNI: employeeJSON.DNI });
                if (empleadoExistente) {
                    res.status(200).json({ message: `Error al añadir el empleado en la base de datos: el empleado ya existe`, success: false });
                    return;
                }
                yield employeeToAdd.save();
                res.status(200).json({ message: `El empleado ha sido añadido en la base de datos`, success: true });
            }
            catch (err) {
                res.status(500).json({ message: `Error al añadir el empleado en la BBDD: ${err}`, success: false });
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
                    $or: [{ 'nombre': { $regex: employeeAttr, $options: "i" } }, { 'DNI': { $regex: employeeAttr, $options: "i" } }]
                }).exec();
                res.status(200).json({ message: employees, success: true });
            }
            catch (err) {
                res.status(500).json({ message: `Error al buscar los empleados: ${err}`, success: false });
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
                const employeeUpdated = yield this.CollectionModel.updateOne({ nombre: employeeToUpdate }, {
                    nombre: employeeJSON.nombre,
                    apellidos: employeeJSON.apellidos,
                    dni: employeeJSON.dni,
                    genero: employeeJSON.genero,
                    email: employeeJSON.email,
                    fechaBaja: employeeJSON.fechaBaja
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
exports.OldEmployeeDBController = OldEmployeeDBController;
