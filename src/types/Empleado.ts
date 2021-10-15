import { Document } from 'mongoose';

export interface IEmployee extends Document {
    nombre: string
    apellidos: string
    genero: string
    correoElectrónico: string
    hashPassword: string 
    horasPorSemana: number
    fechaAlta: Date
    fechaBaja: Date
    diasLibresDisponibles: number
    alta: boolean
}