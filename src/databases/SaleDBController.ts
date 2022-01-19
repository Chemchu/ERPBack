import mongoose from 'mongoose';
import { ISale } from '../types/Venta';
import IDBController from './IDBController';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { IDBState } from '../types/DBState';
export class SaleDBController implements IDBController {

	public CollectionModel: mongoose.Model<ISale & IDBState>;

	constructor(modelo: mongoose.Model<ISale & IDBState>) {
		this.CollectionModel = modelo
	}

	public async Add(req: Request, res: Response): Promise<void> {
		// La venta en JSON de la petición
		const saleJSON = req.body;

		/* Esquema de saleJSON.productos
			{ _id: String, cantidad: Number, dto: Number, precioUnidad: Number } 
		*/

		// Crea el producto
		const saleToAdd: mongoose.Document<ISale> = new this.CollectionModel({
			productos: saleJSON.productos,
			dineroEntregadoEfectivo: saleJSON.precioVentaEfectivo,
			dineroEntregadoTarjeta: saleJSON.precioVentaTarjeta,
			precioVentaTotal: saleJSON.precioVentaTotal,
			cambio: saleJSON.cambio,
			cliente: saleJSON.clientID,
			vendidoPor: saleJSON.empleadoID,
			modificadoPor: saleJSON.empleadoID,
			tipo: saleJSON.tipo,
			descuentoEnEfectivo: saleJSON.dtoEfectivo,
			descuentoEnPorcentaje: saleJSON.dtoTarjeta,
		});

		try {
			await saleToAdd.save();
			res.status(200).json({ message: `La venta ha sido añadido en la base de datos`, success: true });
		}
		catch (err) {
			console.log(err);
			res.status(500).json({ message: `Error al añadir la venta a la base de datos: ${err}`, success: false });
		}
	}

	public async GetAll(res: Response): Promise<void> {
		try {
			const saleArray = await this.CollectionModel.find({ databaseState: { "$exists": false } }).sort({ 'createdAt': -1 });
			res.status(200).json({ message: saleArray, success: true });
		}
		catch (err) {
			console.log(err);
			res.status(500).json({ message: `Error al buscar las ventas: ${err}`, success: false });
		}
	}

	public async Get(req: Request, res: Response): Promise<void> {
		try {
			const saleDate = req.params.id;
			const sales = await this.CollectionModel.find({ 'createdAt': new Date(saleDate) }).exec();

			res.status(200).json({ message: sales, success: true });
		}
		catch (err) {
			console.log(err);
			res.status(500).json({ message: `Error al buscar las ventas: ${err}`, success: false });
		}
	}

	public async GetDBState(req: Request, res: Response): Promise<void> {
		try {
			const dbState = await this.CollectionModel.find({}).select({ 'databaseState': 1 }).lean();

			for (var i = 0; i < dbState.length; i++) {
				if (dbState[i].databaseState) {
					res.status(200).json({ message: dbState[i], success: true });
					return;
				}
			}

			const stateUid = uuidv4();
			const databaseStateToAdd = new this.CollectionModel({
				databaseState: stateUid
			});

			await databaseStateToAdd.save();

			res.status(300).json({ message: 'El databaseState no se encuentra en la base de datos. Uno nuevo ha sido creado', success: false });
		}
		catch (err) {
			res.status(500).json({ message: `Error al buscar el databaseState: ${err}`, success: false });
		}
	}

	public async Remove(req: Request, res: Response): Promise<void> {
		const saleID = req.params.id;
		try {
			const saleDeleted = await this.CollectionModel.deleteOne({ _id: saleID });
			if (saleDeleted.deletedCount > 0) {
				res.status(200).json({ message: `La venta ${saleID} ha sido borrada correctamente de la base de datos`, success: true });
				return;
			}
			res.status(200).json({ message: `Error al borrar ${saleID} de la base de datos: la venta no existe`, success: false });
		}
		catch (err) {
			console.log(err);
			res.status(500).json({ message: `Error al borrar ${saleID} de la base de datos: ${err}`, success: false });
		}
	}

	public async Update(req: Request, res: Response): Promise<void> {
		const saleToUpdate = req.params.id;
		try {
			const saleJSON = req.body;
			const saleUpdated = await this.CollectionModel.updateOne({ _id: saleToUpdate }, {
				productos: saleJSON.productsID,
				precioVentaTotal: saleJSON.precioVentaTotal,
				cambio: saleJSON.cambio,
				cliente: saleJSON.clientID,
				tipo: saleJSON.tipo
			});

			if (saleUpdated.modifiedCount > 0) {
				res.status(200).json({ message: `La venta ${saleToUpdate} ha sido actualizada correctamente`, success: true });
				return;
			}
			res.status(200).json({ message: `Error al actualizar ${saleToUpdate} en la base de datos: la venta no existe`, success: false });
		}
		catch (err) {
			console.log(err);
			res.status(500).json({ message: `Error al actualizar ${saleToUpdate} en la base de datos: ${err}`, success: false });
		}
	}
}
