import { UserInputError } from "apollo-server-express";
import { Database } from "../../../databases/database";
import jwt from "jsonwebtoken";

export const cierreTpvResolver = async (parent: any, args: any, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    if (!args.find.nombre && !args.find._id) throw new UserInputError('Argumentos inválidos: Find no puede estar vacío');

    const db = Database.Instance();

    if (args.find.nombre) {
        return await db.TPVDBController.CollectionModel.findOne({ nombre: args.find.nombre }).exec();
    }

    return await db.TPVDBController.CollectionModel.findOne({ _id: args.find._id }).exec();
}

export const cierreTpvsResolver = async (parent: any, args: any, context: any, info: any) => {
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

export const addCierreTpvResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

}

export const deleteCierreTpvResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();
}

export const updateCierreTpvResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

}
