import mongoose from 'mongoose';
import { IEmployee } from '../types/Empleado';
export class EmployeeDBController {

	public CollectionModel: mongoose.Model<IEmployee>;

	constructor(modelo: mongoose.Model<IEmployee>) {
		this.CollectionModel = modelo
	}

}
