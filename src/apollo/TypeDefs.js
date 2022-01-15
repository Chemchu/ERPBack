"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtValidatorDefs_1 = __importDefault(require("./schema/authentication/jwtValidatorDefs"));
const loginDefs_1 = __importDefault(require("./schema/authentication/loginDefs"));
const clienteDefs_1 = __importDefault(require("./schema/cliente/clienteDefs"));
const empleadoDefs_1 = __importDefault(require("./schema/empleado/empleadoDefs"));
const productoDefs_1 = __importDefault(require("./schema/producto/productoDefs"));
const ventaDefs_1 = __importDefault(require("./schema/venta/ventaDefs"));
const TypeDefs = [
    productoDefs_1.default,
    clienteDefs_1.default,
    ventaDefs_1.default,
    empleadoDefs_1.default,
    loginDefs_1.default,
    jwtValidatorDefs_1.default
];
exports.default = TypeDefs;
