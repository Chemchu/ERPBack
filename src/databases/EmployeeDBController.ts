import mongoose from 'mongoose';
import { IEmployee } from '../types/Empleado';
import bcrypt from "bcryptjs";
export class EmployeeDBController {

	public CollectionModel: mongoose.Model<IEmployee>;

	constructor(modelo: mongoose.Model<IEmployee>) {
		this.CollectionModel = modelo
	}

	async CreateEmployee(Empleado: IEmployee, password: string) {
		try {
			const salt = bcrypt.genSaltSync(10);
			let hashedPassword = await bcrypt.hash(password, salt);

			// Crea el empleado
			const employeeToAdd: mongoose.Document<IEmployee> = new this.CollectionModel({
				nombre: Empleado.nombre,
				apellidos: Empleado.apellidos,
				dni: Empleado.dni,
				genero: Empleado.genero,
				email: Empleado.email,
				hashPassword: hashedPassword,
				horasPorSemana: Empleado.horasPorSemana,
				fechaAlta: Empleado.fechaAlta,
			});

			const empleadoExistente = await this.CollectionModel.exists({ dni: Empleado.dni });
			if (empleadoExistente) { throw "Admin ya existe" }

			await employeeToAdd.save();
		}
		catch (err) {
			console.log(err);
		}
	}

}
