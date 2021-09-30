"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const db = require('./database.js');
class Router {
    constructor() {
        this.app = (0, express_1.default)();
        db.mongoose.connect(db.url + db.dbName, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Connected to the database!");
        }).catch((err) => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });
        var corsOptions = {
            origin: "http://localhost:8081"
        };
        this.app.use(cors(corsOptions));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.setRoutes();
    }
    setRoutes() {
        this.app.get("/", (req, res) => {
            res.json({ message: "Bienvenido al API Restful de ERPSolution" });
        });
        this.app.use('/api/productos/', productRoutes_1.default);
    }
    get App() {
        return this.app;
    }
}
exports.Router = Router;
