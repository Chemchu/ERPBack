import mongoose from 'mongoose';
import { IClient } from '../types/Cliente';
import IDBController from './IDBController';
import { Request, Response } from 'express';

export class ClientDBController implements IDBController {

    public CollectionModel: mongoose.Model<IClient>;

    constructor(modelo: mongoose.Model<IClient>) {
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

		try{					
			await clientToAdd.save();
			res.status(200).json({message: `El cliente ha sido añadido en la base de datos`, success: true});
		}
		catch(err) {
			res.status(500).json({message: `Error al añadir el cliente a la base de datos: ${err}`, success: false});
		}
	}

	public async GetAll(res: Response): Promise<void> {
		try {
			const clientArray = await this.CollectionModel.find({});
			res.status(200).json({message: clientArray, success: true});
		}
		catch(err) {
			res.status(500).json({message: `Error al buscar los clientes: ${err}`, success: false});
		}
	}

	public async Get(req: Request, res: Response): Promise<void> {		
		try {
            const clientAttr = req.params.id;
			const clients = await this.CollectionModel.find(
			{ 
				$or:[{'nombre': {$regex : clientAttr, $options: "i"} }, {'nif': {$regex : clientAttr, $options: "i"} }]
			}
			).exec();	

			//console.log(employees.length); // ---> Para contar cuantos clientes devuelve la db
				
			res.status(200).json({message: clients, success: true});
		}
		catch(err) {
			res.status(500).json({message: `Error al buscar los clientes: ${err}`, success: false});
		}		
	}

	public async Remove(req: Request, res: Response): Promise<void> {
		const clientID = req.params.id;
		try {
			const clientDeleted = await this.CollectionModel.deleteOne({_id: clientID});
			if(clientDeleted.deletedCount > 0) {
				res.status(200).json({message: `El cliente ${clientID} ha sido borrado correctamente de la base de datos`, success: true});
				return;
			}
			res.status(200).json({message: `Error al borrar ${clientID} de la base de datos: el cliente no existe`, success: false});
		}
		catch(err) {
			res.status(500).json({message: `Error al borrar ${clientID} de la base de datos: ${err}`, success: false});
		}
	}

	public async Update(req: Request, res: Response): Promise<void> {
		const clientToUpdate = req.params.id;
        try {
			const clientJSON = req.body;
			const clientUpdated = await this.CollectionModel.updateOne({_id: clientToUpdate}, {
				nif: clientJSON.nif,
				nombre: clientJSON.nombre,
				calle: clientJSON.calle,
				cp: clientJSON.cp,
			});

			if(clientUpdated.modifiedCount > 0) {
				res.status(200).json({message: `El cliente ${clientJSON.nombre} ha sido actualizada correctamente`, success: true});
				return;
			}
			res.status(200).json({message: `Error al actualizar ${clientJSON.nombre} en la base de datos: el cliente no existe`, success: false});
		}
		catch(err) {
			res.status(500).json({message: `Error al actualizar ${clientToUpdate} en la base de datos: ${err}`, success: false});
		}
	}
}
