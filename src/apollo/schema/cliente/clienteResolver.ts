import { UserInputError } from "apollo-server-express";
import { Database } from "../../../databases/database"
import { ClienteFind, ClientesFind } from "../../../types/types";

export const clienteResolver = async (parent: any, args: ClienteFind, context: any, info: any) => {
    if (args === null || !args || Object.keys(args).length === 0 && args.constructor === Object) throw new UserInputError('Argumentos inválidos: Find no puede estar vacío');

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
    const db = Database.Instance();

    // Comprueba si find es null, undefined o vacío
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) {
        const clientes = await db.ClientDBController.CollectionModel.find({}).limit(args.limit || 3000).exec();

        if (clientes) return clientes;
    }

    if (args.find?._id) {
        const clientes = await db.ClientDBController.CollectionModel.find({ _id: args.find._id })
            .limit(args.limit || 3000)
            .exec();

        if (clientes) return clientes;
    }

    if (args.find?.nif) {
        const clientes = await db.ClientDBController.CollectionModel.find({ nif: args.find.nif })
            .limit(args.limit || 3000)
            .exec();

        if (clientes) return clientes;
    }

    if (args.find?.nombre) {
        const clientes = await db.ClientDBController.CollectionModel.find({ nombre: args.find.nombre })
            .limit(args.limit || 3000)
            .exec();

        if (clientes) return clientes;
    }

    return [];
}

