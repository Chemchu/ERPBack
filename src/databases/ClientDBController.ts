import mongoose from 'mongoose';
import { IClient } from '../types/Cliente';
import IDBController from './IDBController';
import { Request, Response } from 'express';
import { IDBState } from '../types/DBState';
import { v4 as uuidv4 } from 'uuid';

export class ClientDBController implements IDBController {

	public CollectionModel: mongoose.Model<IClient & IDBState>;

	constructor(modelo: mongoose.Model<IClient & IDBState>) {
		this.CollectionModel = modelo
	}

	public async Add(req: Request, res: Response): Promise<void> {

		// El cliente en JSON de la petición
		const clientJSON = req.body;

		// Crea el producto
		const clientToAdd: mongoose.Document<IClient> = new this.CollectionModel({
			nif: clientJSON.nif,
			nombre: clientJSON.nombre,
			calle: clientJSON.calle,
			cp: clientJSON.cp,
		});

		try {
			await clientToAdd.save();
			res.status(200).json({ message: `El cliente ha sido añadido en la base de datos`, success: true });
		}
		catch (err) {
			res.status(500).json({ message: `Error al añadir el cliente a la base de datos: ${err}`, success: false });
		}
	}

	public async GetAll(res: Response): Promise<void> {
		try {
			const clientArray = await this.CollectionModel.find({});
			res.status(200).json({ message: clientArray, success: true });
		}
		catch (err) {
			res.status(500).json({ message: `Error al buscar los clientes: ${err}`, success: false });
		}
	}

	public async Get(req: Request, res: Response): Promise<void> {
		try {
			const clientAttr = req.params.id;
			const clients = await this.CollectionModel.find(
				{
					$or: [{ 'nombre': { $regex: clientAttr, $options: "i" } }, { 'nif': { $regex: clientAttr, $options: "i" } }]
				}
			).exec();

			//console.log(employees.length); // ---> Para contar cuantos clientes devuelve la db

			res.status(200).json({ message: clients, success: true });
		}
		catch (err) {
			res.status(500).json({ message: `Error al buscar los clientes: ${err}`, success: false });
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
			} as IDBState);

			await databaseStateToAdd.save();

			res.status(300).json({ message: 'El databaseState no se encuentra en la base de datos. Uno nuevo ha sido creado', success: false });
		}
		catch (err) {
			res.status(500).json({ message: `Error al buscar el databaseState: ${err}`, success: false });
		}
	}

	public async Remove(req: Request, res: Response): Promise<void> {
		const clientID = req.params.id;
		try {
			const clientDeleted = await this.CollectionModel.deleteOne({ _id: clientID });
			if (clientDeleted.deletedCount > 0) {
				res.status(200).json({ message: `El cliente ${clientID} ha sido borrado correctamente de la base de datos`, success: true });
				return;
			}
			res.status(200).json({ message: `Error al borrar ${clientID} de la base de datos: el cliente no existe`, success: false });
		}
		catch (err) {
			res.status(500).json({ message: `Error al borrar ${clientID} de la base de datos: ${err}`, success: false });
		}
	}

	public async Update(req: Request, res: Response): Promise<void> {
		const clientToUpdate = req.params.id;
		try {
			const clientJSON = req.body;
			const clientUpdated = await this.CollectionModel.updateOne({ _id: clientToUpdate }, {
				nif: clientJSON.nif,
				nombre: clientJSON.nombre,
				calle: clientJSON.calle,
				cp: clientJSON.cp,
			});

			if (clientUpdated.modifiedCount > 0) {
				res.status(200).json({ message: `El cliente ${clientJSON.nombre} ha sido actualizada correctamente`, success: true });
				return;
			}
			res.status(200).json({ message: `Error al actualizar ${clientJSON.nombre} en la base de datos: el cliente no existe`, success: false });
		}
		catch (err) {
			res.status(500).json({ message: `Error al actualizar ${clientToUpdate} en la base de datos: ${err}`, success: false });
		}
	}
}
