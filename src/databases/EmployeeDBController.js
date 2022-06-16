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
exports.EmployeeDBController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class EmployeeDBController {
    constructor(modelo) {
        this.CollectionModel = modelo;
    }
    CreateEmployee(Empleado, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = bcryptjs_1.default.genSaltSync(10);
                let hashedPassword = yield bcryptjs_1.default.hash(password, salt);
                const employeeToAdd = new this.CollectionModel({
                    nombre: Empleado.nombre,
                    apellidos: Empleado.apellidos,
                    dni: Empleado.dni,
                    genero: Empleado.genero,
                    email: Empleado.email,
                    hashPassword: hashedPassword,
                    horasPorSemana: Empleado.horasPorSemana,
                    fechaAlta: Empleado.fechaAlta,
                });
                const empleadoExistente = yield this.CollectionModel.exists({ dni: Empleado.dni });
                if (empleadoExistente) {
                    throw "Admin ya existe";
                }
                yield employeeToAdd.save();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.EmployeeDBController = EmployeeDBController;
