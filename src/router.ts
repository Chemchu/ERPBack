import prodRouter from './routes/productRoutes.js';
import clientRouter from './routes/clientRoutes.js';
import employeeRouter from './routes/employeeRoutes.js';
import sessionRouter from './routes/sessionRoutes.js';
import saleRouter from './routes/saleRoutes.js';
import { Database } from './databases/database.js';
import express, { Request, Response } from 'express';
const cors = require('cors');

export class Router {
    public app;
    public database: Database;
  
    constructor () {
        this.app = express();
        this.database = Database.Instance();

        var corsOptions = {
            origin: "*"
        };

        this.app.use(cors(corsOptions));

        // parse requests of content-type - application/json
        this.app.use(express.json());

        // parse requests of content-type - application/x-www-form-urlencoded
        this.app.use(express.urlencoded({extended: true}));
        
        // Enruta los diferentes componentes del api
        this.setRoutes();
    }
  
    private setRoutes(): void {
        this.app.get("/api", (req:Request, res:Response) => {
            res.json({ message: "Bienvenido al API Restful de ERPSolution" });
        });

        this.app.use('/api/productos/', prodRouter);
        this.app.use('/api/clientes/', clientRouter);
        this.app.use('/api/ventas/', saleRouter);
        this.app.use('/api/empleados/', employeeRouter);
        this.app.use('/api/login/', sessionRouter);
    }

    public get App(): Express.Application  {
        return this.app;
    }
}