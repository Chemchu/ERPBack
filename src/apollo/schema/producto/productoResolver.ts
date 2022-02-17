import { UserInputError } from "apollo-server-express";
import { Database } from "../../../databases/database"
import { ProductoFind, ProductosFind } from "../../../types/types";
import { ISale } from "../../../types/Venta";

export const productoResolver = async (parent: any, args: ProductoFind, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    if (!args.find._id && !args.find.nombre && !args.find.ean) throw new UserInputError('Argumentos inválidos: Find no puede estar vacío');

    const db = Database.Instance();

    if (args.find._id) {
        const producto = await db.ProductDBController.CollectionModel.findOne({ _id: args.find._id }).exec();

        if (producto) return producto;
    }

    if (args.find.nombre) {
        const producto = await db.ProductDBController.CollectionModel.findOne({ nombre: { "$regex": args.find.nombre, "$options": "i" } }).exec();

        if (producto) return producto;
    }

    if (args.find.ean) {
        const producto = await db.ProductDBController.CollectionModel.findOne({ ean: args.find.ean }).exec();

        if (producto) return producto;
    }

    return null;
}

export const productosResolver = async (parent: any, args: ProductosFind, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

    // Comprueba si find es null, undefined o vacío
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) {
        // const ventas: ISale[] = await db.VentasDBController.CollectionModel.find({}).sort({ 'createdAt': -1 });
        // let prodArray: string[] = new Array();

        // for (let i = 0; i < 150; i++) {
        //     for (let j = 0; j < 0; j++) {
        //         prodArray.push(ventas[i].productos[j].nombre);
        //     }
        // }

        // const mostSoldProducts = GetMostSoldItems(prodArray, 100);

        // const productos = await db.ProductDBController.CollectionModel.find()
        //     .where('nombre')
        //     .in(mostSoldProducts)
        //     .limit(args.limit || 150)
        //     .exec();

        const productos = await db.ProductDBController.CollectionModel.find()
            .limit(args.limit || 150)
            .exec();

        return productos;
    }

    if (args.find?._ids) {
        const productos = await db.ProductDBController.CollectionModel.find({ _id: args.find._ids })
            .limit(args.limit || 150)
            .exec();

        return productos;
    }

    if (args.find?.nombre) {
        const productos = await db.ProductDBController.CollectionModel.find({ nombre: { "$regex": args.find.nombre, "$options": "i" } })
            .limit(args.limit || 150)
            .exec();

        return productos;
    }

    if (args.find?.familia) {
        const productos = await db.ProductDBController.CollectionModel.find({ familia: { "$regex": args.find.familia, "$options": "i" } })
            .limit(args.limit || 150)
            .exec();

        return productos;
    }

    if (args.find?.proveedor) {
        const productos = await db.ProductDBController.CollectionModel.find({ proveedor: { "$regex": args.find.proveedor, "$options": "i" } })
            .limit(args.limit || 150)
            .exec();

        return productos;
    }

    return [];
}

export const addProductoResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

}

export const deleteProductoResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();
}

export const updateProductoResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

}

export const uploadProductoFileResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

}

