import mongoose from 'mongoose';
import { IProduct } from '../types/Producto';
import IDBController from './IDBController';
import { Request, Response } from 'express';

export class ProductoDBController implements IDBController {

    public CollectionModel: mongoose.Model<IProduct>;

    constructor(modelo: mongoose.Model<IProduct>) {
        this.CollectionModel = modelo
    }

    public async Add(req: Request, res: Response): Promise<void> {
		try{			
			// El producto en JSON de la petición
			const prodJSON = req.body;

			// Crea el producto
			const productoToAdd: mongoose.Document<IProduct> = new this.CollectionModel({
				nombre: prodJSON.nombre,
				descripcion: prodJSON.descripcion,
				familia: prodJSON.familia,
				precioVenta: prodJSON.precioVenta,
				precioCompra: prodJSON.precioCompra,
				iva: prodJSON.iva,
				ean: prodJSON.ean,
				alta: prodJSON.alta,
				tags: prodJSON.tags,
				cantidad: prodJSON.cantidad
			});

			const prodName = productoToAdd.get('nombre');
			const prodEAN = productoToAdd.get('ean');

			const yaExisteProducto = await this.CollectionModel.exists({nombre: prodName});
			if(yaExisteProducto) {res.status(200).json({message: `Error al añadir ${prodJSON.nombre} en la base de datos: nombre en uso`, success: false}); return;}
			
			const yaExisteEAN = await this.CollectionModel.exists({ean: prodEAN});
			if(yaExisteEAN) {res.status(200).json({message: `Error al añadir ${prodJSON.nombre} en la base de datos: EAN en uso`, success: false}); return;}
		
			await productoToAdd.save();
			res.status(200).json({message: `El producto ${prodName} ha sido añadido en la base de datos`, success: true});
		}
		catch(err) {
			console.log(err);
			res.status(500).json({message: `Error al añadir el producto en la base de datos`, success: false});
		}
	}

	public async GetAll(res: Response) : Promise<void>{
		try {
			const prodArray = await this.CollectionModel.find({});
			res.status(200).json({message: prodArray, success: true});
		}
		catch(err) {
			res.status(500).json({message: `Error al buscar los productos: ${err}`, success: false});
		}
	}

	public async Get(req: Request, res: Response): Promise<void> {		
		try {
            const prodAttr = req.params.id;
			const products = await this.CollectionModel.find(
			{ 
				$or:[{'nombre': {$regex : prodAttr, $options: "i"} }, {'familia': {$regex : prodAttr, $options: "i"} }, {'EAN': {$regex : prodAttr, $options: "i"} }]
			}
			).exec();	

			//console.log(products.length); // ---> Para contar cuantos productos devuelve la db
				
			res.status(200).json({message: products, success: true});
		}
		catch(err) {
			res.status(500).json({message: `Error al buscar los productos: ${err}`, success: false});
		}		
	}

	// TODO
	public async Remove(req: Request, res: Response): Promise<void> {
        const productName = req.params.id;
		try {
			const productDeleted = await this.CollectionModel.deleteOne({nombre: productName});
			if(productDeleted.deletedCount > 0) {
				res.status(200).json({message: `El producto ${productName} ha sido borrado correctamente de la base de datos`, success: true});
				return;
			}
			res.status(200).json({message: `Error al borrar ${productName} de la base de datos: el producto no existe`, success: false});
		}
		catch(err) {
			res.status(500).json({message: `Error al borrar ${productName} de la base de datos: ${err}`, success: false});
		}
	}

	// TODO
	public async Update(req: Request, res: Response): Promise<void> {
		const productoToUpdate = req.params.id;
        try {
			const prodJSON = req.body;
			const productUpdated = await this.CollectionModel.updateOne({nombre: productoToUpdate}, {
				nombre: prodJSON.nombre,
				descripcion: prodJSON.descripcion,
				familia: prodJSON.familia,
				precioVenta: prodJSON.precioVenta,
				precioCompra: prodJSON.precioCompra,
				iva: prodJSON.iva,
				ean: prodJSON.ean,
				alta: prodJSON.alta,
				tags: prodJSON.tags,
				cantidad: prodJSON.cantidad
			});

			// Ejemplo del JSON del request.body 
			// {
			// 	"nombre": "Aquarel",
			// 	"descripcion": "Agua barata",
			// 	"familia": "Bebida",
			// 	"precioVenta": 0.26,
			// 	"precioCompra": 0.15,
			// 	"IVA": 0,
			// 	"EAN": ["Aquarel"],
			// 	"alta": true,
			// 	"tags": [""],
			// 	"cantidad": 1000
			// }

			if(productUpdated.modifiedCount > 0) {
				res.status(200).json({message: `El producto ${productoToUpdate} ha sido actualizado correctamente`, success: true});
				return;
			}
			res.status(200).json({message: `Error al actualizar ${productoToUpdate} en la base de datos: el producto no existe`, success: false});
		}
		catch(err) {
			res.status(500).json({message: `Error al actualizar ${productoToUpdate} en la base de datos: ${err}`, success: false});
		}
	}
}
