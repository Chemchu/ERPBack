import mongoose from 'mongoose';
import { IEmployee } from '../types/Empleado';
import bcrypt from "bcryptjs";
export class EmployeeDBController {

	public CollectionModel: mongoose.Model<IEmployee>;

	constructor(modelo: mongoose.Model<IEmployee>) {
		this.CollectionModel = modelo
	}

	async CreateEmployee(Empleado: IEmployee, password: string): Promise<boolean> {
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
				rol: Empleado.rol,
				hashPassword: hashedPassword,
				horasPorSemana: Empleado.horasPorSemana,
				fechaAlta: Empleado.fechaAlta || new Date(Date.now()),
			});

			const empleadoExistente = await this.CollectionModel.exists({
				$or: [
					{ dni: Empleado.dni },
					{ email: Empleado.email }
				]
			});
			if (empleadoExistente) { throw `El empleado con correo ${Empleado.email} y/o DNI ${Empleado.dni} ya existe` }

			await employeeToAdd.save().catch(() => { return false; });
			return true;
		}
		catch (err) {
			console.error(err);
			return false;
		}
	}

}
