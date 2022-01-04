import {Schema, model, Model} from 'mongoose';
import { IOldEmployee } from '../types/Empleado';

export class OldEmpleado {
  private modelo: Model<IOldEmployee>;

  constructor(){
      const EmpleadoSchema = new Schema({
        nombre: {type: String, required: true},
        apellidos: {type: String, required: true},
        dni: {type: String, required: true, unique: true},
        genero: {type: String, required: true},
        email: {type: String, required: true},
      }, {strict: true});

      this.modelo = model<IOldEmployee>('AntiguosEmpleados', EmpleadoSchema);
  }

  public get Model(): Model<IOldEmployee> {
      return this.modelo;
  }
}
