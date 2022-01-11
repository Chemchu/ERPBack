import { Database } from "../../../databases/database"

export const productoResolver = async (parent: any, args: any, context: any, info: any) => {
    const db = Database.Instance();
    const producto = await db.ProductDBController.CollectionModel.findOne({ _id: args._id }).exec();

    if (producto) {
        return producto;
    }

    return null;
}

export const productosResolver = async (parent: any, args: any, context: any, info: any) => {
    const db = Database.Instance();

    // Usar los otros argumentos
    const productos = await db.ProductDBController.CollectionModel.find({ nombre: args.find.nombre }).exec();

    if (productos) {
        return productos;
    }

    // Si le paso null, me devuelve el databaseState. Arreglar.
    return null;
}

