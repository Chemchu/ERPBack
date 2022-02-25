import { UserInputError } from "apollo-server-express";
import { Database } from "../../../databases/database";
import { TPVFind, TPVsFind } from "../../../types/types"; var bcrypt = require('bcryptjs');
import jwt from "jsonwebtoken";

export const tpvResolver = async (parent: any, args: TPVFind, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    if (!args.find.nombre && !args.find._id) throw new UserInputError('Argumentos inválidos: Find no puede estar vacío');

    const db = Database.Instance();

    if (args.find.nombre) {
        return await db.TPVDBController.CollectionModel.findOne({ nombre: args.find.nombre }).exec();
    }

    return await db.TPVDBController.CollectionModel.findOne({ _id: args.find._id }).exec();
}

export const tpvsResolver = async (parent: any, args: TPVsFind, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) {

        const tpv = await db.TPVDBController.CollectionModel.find({})
            .limit(150)
            .exec();

        return tpv;
    }

    if (args.find) {
        const tpv = await db.TPVDBController.CollectionModel.find({ abierta: args.find.libre })
            .limit(150)
            .exec();

        return tpv;
    }

    return [];
}

export const addTpvResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

}

export const deleteTpvResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();
}

export const updateTpvResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

}

export const ocupyTpvResolver = async (root: any, args: { idEmpleado: string, idTPV: string }, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

    // Secret Key
    const secret = process.env.JWT_SECRET;

    if (secret) {
        const empleado = await db.EmployeeDBController.CollectionModel.findOne({ _id: args.idEmpleado }).exec();
        if (!empleado) { throw new UserInputError('Empleado no encontrado'); }

        const tpv = await db.TPVDBController.CollectionModel.findOne({ _id: args.idTPV }).exec();
        if (!tpv) throw new UserInputError('TPV no encontrada');

        await tpv.update({ libre: false });

        //Login JWT payload
        const payload = { _id: empleado._id, nombre: empleado.nombre, email: empleado.email, rol: empleado.rol, TPV: tpv._id };
        const jwtHoursDuration = process.env.JWT_HOURS_DURATION || 1;

        // Create Token Expires in 1 hour
        const token = await jwt.sign(payload, secret, {
            expiresIn: 3600 * Number(jwtHoursDuration)
        });

        // Finally return user token
        return {
            token: `Bearer ${token}`
        };
    }
}

export const freeTpvResolver = async (root: any, args: { idEmpleado: string, idTPV: string }, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

    // Secret Key
    const secret = process.env.JWT_SECRET;

    if (secret) {
        console.log("yepaaali");


        const empleado = await db.EmployeeDBController.CollectionModel.findOne({ _id: args.idEmpleado }).exec();
        if (!empleado) { throw new UserInputError('Empleado no encontrado'); }

        const tpv = await db.TPVDBController.CollectionModel.findOne({ _id: args.idTPV }).exec();
        if (!tpv) throw new UserInputError('TPV no encontrada');

        await tpv.update({ libre: true });

        //Login JWT payload
        const payload = { _id: empleado._id, nombre: empleado.nombre, email: empleado.email, rol: empleado.rol };
        const jwtHoursDuration = process.env.JWT_HOURS_DURATION || 1;

        // Create Token Expires in 1 hour
        const token = await jwt.sign(payload, secret, {
            expiresIn: 3600 * Number(jwtHoursDuration)
        });

        // Finally return user token
        return {
            token: `Bearer ${token}`
        };
    }
}

