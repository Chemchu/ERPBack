"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const productRoutes_js_1 = __importDefault(require("./routes/productRoutes.js"));
const clientRoutes_js_1 = __importDefault(require("./routes/clientRoutes.js"));
const employeeRoutes_js_1 = __importDefault(require("./routes/employeeRoutes.js"));
const sessionRoutes_js_1 = __importDefault(require("./routes/sessionRoutes.js"));
const saleRoutes_js_1 = __importDefault(require("./routes/saleRoutes.js"));
const database_js_1 = require("./databases/database.js");
const express_1 = __importDefault(require("express"));
const cors = require('cors');
class Router {
    constructor() {
        this.app = (0, express_1.default)();
        this.database = database_js_1.Database.Instance();
        var corsOptions = {
            origin: "*"
        };
        this.app.use(cors(corsOptions));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.setRoutes();
    }
    setRoutes() {
        this.app.get("/api", (req, res) => {
            res.json({ message: "Bienvenido al API Restful de ERPSolution" });
        });
        this.app.use('/api/productos/', productRoutes_js_1.default);
        this.app.use('/api/clientes/', clientRoutes_js_1.default);
        this.app.use('/api/ventas/', saleRoutes_js_1.default);
        this.app.use('/api/empleados/', employeeRoutes_js_1.default);
        this.app.use('/api/login/', sessionRoutes_js_1.default);
    }
    get App() {
        return this.app;
    }
}
exports.Router = Router;
