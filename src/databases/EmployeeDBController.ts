import mongoose from 'mongoose';
import { IEmployee } from '../types/Empleado';
import IDBController from './IDBController';
import { Request, Response } from 'express';

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
export class EmployeeDBController implements IDBController {

	public CollectionModel: mongoose.Model<IEmployee>;

	constructor(modelo: mongoose.Model<IEmployee>) {
		this.CollectionModel = modelo
	}

	public async Add(req: Request, res: Response): Promise<void> {
		// El empleado en JSON de la petición
		const employeeJSON = req.body;
		let hashedPassword = await bcrypt.hash(employeeJSON.password, salt);

		// Crea el empleado
		const employeeToAdd: mongoose.Document<IEmployee> = new this.CollectionModel({
			nombre: employeeJSON.nombre,
			apellidos: employeeJSON.apellidos,
			dni: employeeJSON.dni,
			genero: employeeJSON.genero,
			email: employeeJSON.email,
			hashPassword: hashedPassword,
			horasPorSemana: employeeJSON.horasPorSemana,
			fechaAlta: employeeJSON.fechaAlta,
			diasLibresDisponibles: employeeJSON.diasLibresDisponibles
		});

		try {
			const empleadoExistente = await this.CollectionModel.exists({ dni: employeeJSON.dni });
			if (empleadoExistente) { res.status(200).json({ message: `Error al añadir el empleado en la base de datos: el empleado ya existe`, success: false }); return; }

			await employeeToAdd.save();
			res.status(200).json({ message: `El empleado ha sido añadido en la base de datos`, success: true });
		}
		catch (err) {
			res.status(500).json({ message: `Error al añadir el empleado en la base de datos: ${err}`, success: false });
		}
	}

	public async GetAll(res: Response): Promise<void> {
		try {
			const employeeArr = await this.CollectionModel.find({ databaseState: { "$exists": false } });
			res.status(200).json({ message: employeeArr, success: true });
		}
		catch (err) {
			res.status(500).json({ message: `Error al buscar los empleados: ${err}`, success: false });
		}
	}

	public async Get(req: Request, res: Response): Promise<void> {
		try {
			const employeeAttr = req.params.id;
			const employees = await this.CollectionModel.find(
				{
					$or: [{ 'nombre': { $regex: employeeAttr, $options: "i" } }, { 'apellidos': { $regex: employeeAttr, $options: "i" } }, { 'dni': { $regex: employeeAttr, $options: "i" } }]
				}
			).exec();

			res.status(200).json({ message: employees, success: true });
		}
		catch (err) {
			res.status(500).json({ message: `Error al buscar los empleados: ${err}`, success: false });
		}
	}

	public async GetDBState(req: Request, res: Response): Promise<void> {
		try {
			const databaseState = await this.CollectionModel.find({ "databaseState": { $ne: null } });

			res.status(200).json({ message: databaseState, success: true });
		}
		catch (err) {
			res.status(500).json({ message: `Error al buscar el databaseState: ${err}`, success: false });
		}
	}

	public async Authenticate(req: Request, res: Response): Promise<void> {
		try {
			const employeeJSON = req.body;
			const employeeToAuthenticate = await this.CollectionModel.findOne(
				{
					email: employeeJSON.email
				}).exec();

			if (!employeeToAuthenticate) { res.status(200).json({ message: "Nombre de usuario o contraseña incorrecto", success: false }); return; }

			let doesPasswordsMatch = await bcrypt.compare(employeeJSON.password, employeeToAuthenticate?.hashPassword);

			if (doesPasswordsMatch) res.status(200).json({ message: "Autenticado con éxito", success: true });
			else res.status(200).json({ message: "Fallo en la autenticación", success: false });
		}
		catch (err) {
			res.status(500).json({ message: `Error al autenticar: ${err}`, success: false });
		}
	}

	public async Remove(req: Request, res: Response): Promise<void> {
		const employeeName = req.params.id;
		try {
			const employeeDeleted = await this.CollectionModel.deleteOne({ nombre: employeeName });
			if (employeeDeleted.deletedCount > 0) {
				res.status(200).json({ message: `El empleado ${employeeName} ha sido borrado correctamente de la base de datos`, success: true });
				return;
			}
			res.status(200).json({ message: `Error al borrar ${employeeName} de la base de datos: el empleado no existe`, success: false });
		}
		catch (err) {
			res.status(500).json({ message: `Error al borrar ${employeeName} de la base de datos: ${err}`, success: false });
		}
	}

	public async Update(req: Request, res: Response): Promise<void> {
		const employeeToUpdate = req.params.id;
		try {
			const employeeJSON = req.body;
			let hashedPassword = await bcrypt.hash(employeeJSON.password, salt);

			const employeeUpdated = await this.CollectionModel.updateOne({ nombre: employeeToUpdate }, {
				nombre: employeeJSON.nombre,
				apellidos: employeeJSON.apellidos,
				dni: employeeJSON.dni,
				genero: employeeJSON.genero,
				email: employeeJSON.email,
				hashPassword: hashedPassword,
				horasPorSemana: employeeJSON.horasPorSemana,
				fechaAlta: employeeJSON.fechaAlta,
				diasLibresDisponibles: employeeJSON.diasLibresDisponibles
			});

			if (employeeUpdated.modifiedCount > 0) {
				res.status(200).json({ message: `El empleado ${employeeToUpdate} ha sido actualizado correctamente`, success: true });
				return;
			}
			res.status(200).json({ message: `Error al actualizar ${employeeToUpdate} en la base de datos: el empleado no existe`, success: false });
		}
		catch (err) {
			res.status(500).json({ message: `Error al actualizar ${employeeToUpdate} en la base de datos: ${err}`, success: false });
		}
	}
}
