import mongoose from 'mongoose';
import { ISale } from '../types/Venta';
import IDBController from './IDBController';
import { Request, Response } from 'express';

export class SaleDBController implements IDBController {

    public CollectionModel: mongoose.Model<ISale>;

    constructor(modelo: mongoose.Model<ISale>) {
        this.CollectionModel = modelo
    }

	public async Add(req: Request, res: Response): Promise<Response> {
		
		// La venta en JSON de la petición
		const saleJSON = req.body;

		// Crea el producto
		const saleToAdd: mongoose.Document<ISale> = new this.CollectionModel({
			productos: saleJSON.productsID,
            precioVentaTotal: saleJSON.price,
            cliente: saleJSON.clientID,
		});

		try{					
			await saleToAdd.save();
			return res.status(200).json({message: `La venta ha sido añadido en la base de datos`, success: true});
		}
		catch(err) {
			return res.status(500).json({message: `Error al añadir la venta a la base de datos: ${err}`, success: false});
		}
	}

	public async GetAll(res: Response): Promise<Response> {
		try {
			const saleArray = await this.CollectionModel.find({});
			return res.status(200).json({message: saleArray, success: true});
		}
		catch(err) {
			return res.status(500).json({message: `Error al buscar las ventas: ${err}`, success: false});
		}
	}

	public async Get(req: Request, res: Response): Promise<Response> {		
		try {
            const saleDate = req.params.id;
			const sales = await this.CollectionModel.find(
			{ 
				'created_at': new Date(saleDate)
			}
			).exec();	
				
			return res.status(200).json({message: sales, success: true});
		}
		catch(err) {
			return res.status(500).json({message: `Error al buscar las ventas: ${err}`, success: false});
		}		
	}

	public async Remove(req: Request, res: Response): Promise<Response> {
		const saleID = req.params.id;
		try {
			const saleDeleted = await this.CollectionModel.deleteOne({_id: saleID});
			if(saleDeleted.deletedCount > 0) {
				return res.status(200).json({message: `La venta ${saleID} ha sido borrada correctamente de la base de datos`, success: true});
			}
			return res.status(200).json({message: `Error al borrar ${saleID} de la base de datos: la venta no existe`, success: false});
		}
		catch(err) {
			return res.status(500).json({message: `Error al borrar ${saleID} de la base de datos: ${err}`, success: false});
		}
	}

	public async Update(req: Request, res: Response): Promise<Response> {
		const saleToUpdate = req.params.id;
        try {
			const saleJSON = req.body;
			const saleUpdated = await this.CollectionModel.updateOne({_id: saleToUpdate}, {
				productos: saleJSON.productsID,
				precioVentaTotal: saleJSON.price,
				cliente: saleJSON.clientID,
			});

			if(saleUpdated.modifiedCount > 0) {
				return res.status(200).json({message: `La venta ${saleToUpdate} ha sido actualizada correctamente`, success: true});
			}
			return res.status(200).json({message: `Error al actualizar ${saleToUpdate} en la base de datos: la venta no existe`, success: false});
		}
		catch(err) {
			return res.status(500).json({message: `Error al actualizar ${saleToUpdate} en la base de datos: ${err}`, success: false});
		}
	}
}
