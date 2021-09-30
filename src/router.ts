import productRoutes from './routes/productRoutes'
import express, { Request, Response, ErrorRequestHandler } from 'express';
const cors = require('cors');
const db = require('./database.js');

export class Router {
    public app
  
    constructor () {
      this.app = express();
        db.mongoose.connect(db.url + db.dbName, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Connected to the database!");
        }).catch((err: ErrorRequestHandler) => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });

        var corsOptions = {
            origin: "http://localhost:8081"
        };

        this.app.use(cors(corsOptions));

        // parse requests of content-type - application/json
        this.app.use(express.json());

        // parse requests of content-type - application/x-www-form-urlencoded
        this.app.use(express.urlencoded({extended: true}));

        // Enlaza las rutas de las posibles llamadas a api
        this.setRoutes();
    }
  
    setRoutes(){
        this.app.get("/", (req:Request, res:Response) => {
            res.json({ message: "Bienvenido al API Restful de ERPSolution" });
        });

        this.app.use('/api/productos/', productRoutes);
    }

    public get App(): Express.Application  {
        return this.app;
    }
}
// export default (app:express.Express) => {
//     app.get("/", (req:Request, res:Response) => {
//         res.json({ message: "Bienvenido al API Restful de ERPSolution" });
//     });
    
//     app.use('/api/productRoutes', productRoutes);

// }