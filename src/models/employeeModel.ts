import {Schema, model, Model} from 'mongoose';
import { IEmployee } from '../types/Empleado';

export class Empleado {
  private modelo: Model<IEmployee>;

  constructor(){
      const EmpleadoSchema = new Schema({
        nombre: {type: String, required: true},
        apellidos: {type: String, required: true},
        DNI: {type: String, required: true, unique: true},
        genero: {type: String, required: true},
        email: {type: String, required: true},
        hashPassword: {type: String, required: true},
        horasPorSemana: {type: Number, required: true},
        fechaAlta: {type: Date, required: true},
        fechaBaja: {type: Date, required: true},
        diasLibresDisponibles: {type: Number, required: true},
        alta: {type: Boolean, required: true},
      }, {strict: true});

      this.modelo = model<IEmployee>('Empleados', EmpleadoSchema);
  }

  public get Model(): Model<IEmployee> {
      return this.modelo;
  }
}
