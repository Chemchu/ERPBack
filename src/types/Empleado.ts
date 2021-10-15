import { Document } from 'mongoose';

export interface IEmployee extends Document {
    nombre: string
    apellidos: string
    dni: string
    genero: string
    email: string
    hashPassword: string 
    horasPorSemana: number
    fechaAlta: Date
    diasLibresDisponibles: number
}

export interface IOldEmployee extends Document {
    nombre: string
    apellidos: string
    dni: string
    genero: string
    email: string
    fechaBaja: Date
}