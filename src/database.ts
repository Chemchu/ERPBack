import mongoose = require('mongoose');
import dotenv = require('dotenv');
import { Producto } from './models/productoModel';
import { Venta } from './models/ventaModel';
import { IProduct } from './types/Producto';
import { Request, Response, ErrorRequestHandler } from 'express';
import { IClient } from './types/Cliente';
import { ISale } from './types/Venta';
import { Cliente } from './models/clienteModel';

mongoose.Promise = global.Promise;
		
dotenv.config();

let producto = new Producto();
let venta = new Venta();
let cliente = new Cliente();

const dbInformation : any = {
	mongo : mongoose,
	url: process.env.MONGO_URI == "" ? "mongodb://localhost:27017/" : process.env.MONGO_URI,
	dbName : process.env.DATABASE_NAME == "" ? "erp_db" : process.env.DATABASE_NAME,
	productosCollection : producto.Model,
	ventasCollection : venta.Model,
	clientesCollection : cliente.Model,
};

export class Database {
    private static instance: Database;
	private db: mongoose.Mongoose;
	private ProductModel: mongoose.Model<IProduct>;
	private VentasModel: mongoose.Model<ISale>;
	private ClientModel: mongoose.Model<IClient>;

    private constructor () {
		this.db = dbInformation.mongo;

		this.ProductModel = dbInformation.productosCollection;
		this.VentasModel = dbInformation.ventasCollection;
		this.ClientModel = dbInformation.clientesCollection;

		this.db.connect(dbInformation.url + dbInformation.dbName).then(() => {
            console.log("Connected to the database!");
        }).catch((err: ErrorRequestHandler) => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });

    }

    public static Instance(): Database  {
		if(!this.instance) {
			this.instance = new Database();
		}
		return this.instance;
    }

	public get MongooseInstance(): mongoose.Mongoose {
		return this.db;
	}

	public async AddProduct(prodReq: Request, res: Response): Promise<Response> {
		
		// El producto en JSON de la petición
		const prodJSON = prodReq.body;

		// Crea el producto
		const productoToAdd: mongoose.Document<IProduct> = new this.ProductModel({
			nombre: prodJSON.nombre,
			descripcion: prodJSON.descripcion,
			familia: prodJSON.familia,
			precioVenta: prodJSON.precioVenta,
			precioCompra: prodJSON.precioCompra,
			IVA: prodJSON.IVA,
			EAN: prodJSON.EAN,
			alta: prodJSON.alta,
			tags: prodJSON.tags,
			cantidad: prodJSON.cantidad
		});

		const prodName = productoToAdd.get('nombre');
		const prodEAN = productoToAdd.get('EAN');

		try{			
			const yaExisteProducto = await this.ProductModel.exists({nombre: prodName});
			if(yaExisteProducto) return res.status(200).json({message: `Error al añadir ${prodJSON.nombre} en la BBDD: nombre en uso`, success: false});
			
			const yaExisteEAN = await this.ProductModel.exists({EAN: prodEAN});
			if(yaExisteEAN) return res.status(200).json({message: `Error al añadir ${prodJSON.nombre} en la BBDD: EAN en uso`, success: false});
		
			await productoToAdd.save();
			return res.status(200).json({message: `El producto ${prodName} ha sido añadido en la base de datos`, success: true});
		}
		catch(err) {
			return res.status(400).json({message: `Error al añadir ${prodJSON.nombre} a la BBDD: ${err}`, success: false});
		}
	}

	public async GetAllProducts(): Promise<Array<IProduct> | null> {
		const filter = {};
		
		return await this.ProductModel.find(filter);
	}

	public async GetProduct(prodAttr : string): Promise<Array<IProduct> | null> {		
		const regexedQuery = {$regex :  "/^" + prodAttr + "/i"};

		return await this.ProductModel.find(
			{ 
				$or:[{'nombre': regexedQuery }, {'EAN': regexedQuery }, {'familia': regexedQuery}]
			}
		).exec();
	}

	// TODO
	public async RemoveProduct(productName: string, res: Response): Promise<Response> {
		try {
			const productDeleted = await this.ProductModel.deleteOne({nombre: productName});
			if(productDeleted.deletedCount > 0) {
				return res.status(200).json({message: `El producto ${productName} ha sido borrado correctamente de la base de datos`, success: true});
			}
			return res.status(200).json({message: `Error al borrar ${productName} de la BBDD: el producto no existe`, success: false});
		}
		catch(err) {
			return res.status(400).json({message: `Error al borrar ${productName} de la BBDD: ${err}`, success: false});
		}
	}

	// TODO
	public async UpdateProduct(productoToUpdate: string, res: Response): Promise<Response> {
		try {
			const productUpdated = await this.ProductModel.updateOne({nombre: productoToUpdate});
			if(productUpdated.modifiedCount > 0) {
				return res.status(200).json({message: `El producto ${productoToUpdate} ha sido actualizado correctamente`, success: true});
			}
			return res.status(200).json({message: `Error al actualizar ${productoToUpdate} en la BBDD: el producto no existe`, success: false});
		}
		catch(err) {
			return res.status(400).json({message: `Error al actualizar ${productoToUpdate} en la BBDD: ${err}`, success: false});
		}
	}
	
	public async AddSale(saleReq: Request): Promise<boolean> {
		// El producto en JSON de la petición
		const saleJSON = saleReq.body;

		// Crea el producto
		const saleToAdd: mongoose.Document<IProduct> = new this.VentasModel({
			Productos: saleJSON.productos,
            PrecioVentaTotal: saleJSON.precioVentaTotal,
            Cliente: saleJSON.cliente,
		});

		const ventaID = saleToAdd.get('_id');

		console.log(`ID: ${ventaID}`);

		saleToAdd.save(function(err) {
			if(err) {
				console.log(`La venta no se ha podido añadir`); 
				return false;
			}
			else {
				console.log(`La venta ha sido añadido en la base de datos`); 
			}
		});
		
		return true;
	}
}
