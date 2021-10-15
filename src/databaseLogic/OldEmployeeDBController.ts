import mongoose from 'mongoose';
import { IOldEmployee } from '../types/Empleado';
import IDBController from './IDBController';
import { Request, Response } from 'express';

export class OldEmployeeDBController implements IDBController {

    public CollectionModel: mongoose.Model<IOldEmployee>;

    constructor(modelo: mongoose.Model<IOldEmployee>) {
        this.CollectionModel = modelo
    }

    public async Add(req: Request, res: Response): Promise<Response> {
		
		// El empleado en JSON de la petición
		const employeeJSON = req.body;

		// Comprueba que el empleado tenga DNI/NIE
		if(!employeeJSON.dni) return res.status(200).json({message: `El empleado debe tener un DNI/NIE`, success: false}); 

		// Crea el empleado
		const employeeToAdd: mongoose.Document<IOldEmployee> = new this.CollectionModel({
			nombre: employeeJSON.nombre,
            apellidos: employeeJSON.apellidos,
            dni: employeeJSON.dni,
            genero: employeeJSON.genero,
            email: employeeJSON.email,
            fechaBaja: employeeJSON.fechaBaja
		});

		try{			
			const empleadoExistente = await this.CollectionModel.exists({DNI: employeeJSON.DNI});
			if(empleadoExistente) return res.status(200).json({message: `Error al añadir el empleado en la base de datos: el empleado ya existe`, success: false});

			await employeeToAdd.save();
			return res.status(200).json({message: `El empleado ha sido añadido en la base de datos`, success: true});
		}
		catch(err) {
			return res.status(500).json({message: `Error al añadir el empleado en la BBDD: ${err}`, success: false});
		}
	}

	public async GetAll(res: Response): Promise<Response> {
		try {
			const employeeArr = await this.CollectionModel.find({});
			return res.status(200).json({message: employeeArr, success: true});
		}
		catch(err) {
			return res.status(500).json({message: `Error al buscar los empleados: ${err}`, success: false});
		}
	}

	public async Get(req: Request, res: Response): Promise<Response> {		
		try {
            const employeeAttr = req.params.id;
			const employees = await this.CollectionModel.find(
			{ 
				$or:[{'nombre': {$regex : employeeAttr, $options: "i"} }, {'DNI': {$regex : employeeAttr, $options: "i"} }]
			}
			).exec();	

			//console.log(employees.length); // ---> Para contar cuantos empleados devuelve la db
				
			return res.status(200).json({message: employees, success: true});
		}
		catch(err) {
			return res.status(500).json({message: `Error al buscar los empleados: ${err}`, success: false});
		}		
	}

	public async Remove(req: Request, res: Response): Promise<Response> {
		const employeeName = req.params.id;
		try {
			const employeeDeleted = await this.CollectionModel.deleteOne({nombre: employeeName});
			if(employeeDeleted.deletedCount > 0) {
				return res.status(200).json({message: `El empleado ${employeeName} ha sido borrado correctamente de la base de datos`, success: true});
			}
			return res.status(200).json({message: `Error al borrar ${employeeName} de la base de datos: el empleado no existe`, success: false});
		}
		catch(err) {
			return res.status(500).json({message: `Error al borrar ${employeeName} de la base de datos: ${err}`, success: false});
		}
	}

	public async Update(req: Request, res: Response): Promise<Response> {
		const employeeToUpdate = req.params.id;
        try {
			const employeeJSON = req.body;
			const employeeUpdated = await this.CollectionModel.updateOne({nombre: employeeToUpdate}, {
				nombre: employeeJSON.nombre,
                apellidos: employeeJSON.apellidos,
                dni: employeeJSON.dni,
                genero: employeeJSON.genero,
                email: employeeJSON.email,
                fechaBaja: employeeJSON.fechaBaja
			});

			if(employeeUpdated.modifiedCount > 0) {
				return res.status(200).json({message: `El empleado ${employeeToUpdate} ha sido actualizado correctamente`, success: true});
			}
			return res.status(200).json({message: `Error al actualizar ${employeeToUpdate} en la base de datos: el empleado no existe`, success: false});
		}
		catch(err) {
			return res.status(500).json({message: `Error al actualizar ${employeeToUpdate} en la base de datos: ${err}`, success: false});
		}
	}
}
