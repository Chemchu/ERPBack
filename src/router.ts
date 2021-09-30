import productRoutes from './routes/productRoutes'
import express, { Request, Response } from 'express';
import { Database } from './database.js';
const cors = require('cors');

export class Router {
    public app;
    public database: Database;
  
    constructor () {
        this.app = express();
        this.database = Database.Instance();

        var corsOptions = {
            origin: "http://localhost:8081"
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
        this.app.get("/", (req:Request, res:Response) => {
            res.json({ message: "Bienvenido al API Restful de ERPSolution" });
        });

        this.app.use('/api/productos/', productRoutes);
    }

    public get App(): Express.Application  {
        return this.app;
    }
}