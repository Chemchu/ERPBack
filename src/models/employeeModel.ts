import {Schema, model, Model} from 'mongoose';
import { IEmployee } from '../types/Empleado';

export class Empleado {
  private modelo: Model<IEmployee>;

  constructor(){
      const EmpleadoSchema = new Schema({
        nombre: {type: String, required: true},
        apellidos: {type: String, required: true},
        genero: {type: String, required: true},
        correoElectrónico: {type: String, required: true},
        hashPassword: {type: String, required: true},
        horasPorSemana: {type: Number, required: true},
        fechaAlta: {type: Date, required: true},
        fechaBaja: {type: Date, required: true},
        diasLibresDisponibles: {type: Number, required: true},
        alta: {type: Boolean, required: true},
      });

      this.modelo = model<IEmployee>('Empleado', EmpleadoSchema);
  }

  public get Model(): Model<IEmployee> {
      return this.modelo;
  }
}
