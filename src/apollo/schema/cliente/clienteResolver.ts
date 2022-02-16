import { UserInputError } from "apollo-server-express";
import { Database } from "../../../databases/database"
import { ClienteFind, ClientesFind } from "../../../types/types";

export const clienteResolver = async (parent: any, args: ClienteFind, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) throw new UserInputError('Argumentos inválidos: Find no puede estar vacío');

    const db = Database.Instance();

    if (args.find._id) {
        const c = await db.ClientDBController.CollectionModel.findOne({ _id: args.find._id }).exec();

        if (c) return c;
    }

    if (args.find.nif) {
        const c = await db.ClientDBController.CollectionModel.findOne({ nif: args.find.nif }).exec();

        if (c) return c;
    }

    if (args.find.nombre) {
        const c = await db.ClientDBController.CollectionModel.findOne({ nombre: { "$regex": args.find.nombre, "$options": "i" } }).exec();

        if (c) return c;
    }

    return null;
}

export const clientesResolver = async (parent: any, args: ClientesFind, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

    // Comprueba si find es null, undefined o vacío
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) {
        const clientes = await db.ClientDBController.CollectionModel.find({}).limit(args.limit || 3000).exec();

        if (clientes) return clientes;
    }

    if (args.find?._ids) {
        const clientes = await db.ClientDBController.CollectionModel.find({ _id: args.find._ids })
            .limit(args.limit || 3000)
            .exec();

        if (clientes) return clientes;
    }

    if (args.find?.nombre) {
        const clientes = await db.ClientDBController.CollectionModel.find({ nombre: { "$regex": args.find.nombre, "$options": "i" } })
            .limit(args.limit || 3000)
            .exec();

        if (clientes) return clientes;
    }

    return [];
}

export const addClienteResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

}

export const deleteClienteResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();
}

export const updateClienteResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

}

export const uploadClienteFileResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

}


