import { UserInputError } from "apollo-server-express";
import mongoose from "mongoose";
import { Database } from "../../../databases/database"
import { IProduct } from "../../../types/Producto";
import { ProductoAddInput, ProductoFind, ProductosFind, ProductoUpdateInput } from "../../../types/types";

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

    if (args.find?.query) {
        const query = args.find.query;
        const isQueryValidId = mongoose.Types.ObjectId.isValid(query);

        let productos = {};
        if (isQueryValidId) {
            productos = await db.ProductDBController.CollectionModel.find({ _id: query })
                .limit(args.limit || 150)
                .exec();
        }
        else {
            productos = await db.ProductDBController.CollectionModel.find({
                $or: [
                    { nombre: { "$regex": query, "$options": "i" } },
                    { familia: { "$regex": query, "$options": "i" } },
                    { ean: { "$regex": query, "$options": "i" } },
                    { proveedor: { "$regex": query, "$options": "i" } }
                ]
            })
                .limit(args.limit || 150)
                .exec();
        }

        return productos;
    }

    return [];
}

// TODO
export const addProductoResolver = async (root: any, args: { producto: ProductoAddInput }, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

    const existeEan = await db.ProductDBController.CollectionModel.find({ ean: args.producto.ean });
    if (existeEan.length > 0) {
        return { message: "EAN en uso", successful: false }
    }

    const existeNombre = await db.ProductDBController.CollectionModel.find({ nombre: args.producto.nombre });
    if (existeNombre.length > 0) {
        return { message: "Nombre en uso", successful: false }
    }

    const updatedProduct: mongoose.Document<IProduct> = new db.ProductDBController.CollectionModel({
        nombre: args.producto.nombre,
        proveedor: args.producto.proveedor,
        familia: args.producto.familia,
        precioVenta: args.producto.precioVenta,
        precioCompra: args.producto.precioCompra,
        iva: args.producto.iva,
        margen: args.producto.margen,
        promociones: args.producto.promociones,
        ean: args.producto.ean,
        cantidad: args.producto.cantidad,
        cantidadRestock: args.producto.cantidadRestock,
        alta: args.producto.alta,
    } as unknown as IProduct);

    const resultado = await updatedProduct.save();

    if (resultado.id) {
        return { message: "Producto añadido correctamente", successful: true }
    }

    return { message: "No se ha podido añadir el producto", successful: false }
}

export const deleteProductoResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();
}

export const updateProductoResolver = async (root: any, args: { producto: ProductoUpdateInput }, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();
    const updatedProduct = {
        nombre: args.producto.nombre,
        proveedor: args.producto.proveedor,
        familia: args.producto.familia,
        precioVenta: args.producto.precioVenta,
        precioCompra: args.producto.precioCompra,
        iva: args.producto.iva,
        margen: args.producto.margen,
        promociones: args.producto.promociones,
        ean: args.producto.ean,
        cantidad: args.producto.cantidad,
        cantidadRestock: args.producto.cantidadRestock,
        alta: args.producto.alta,
    } as unknown as IProduct;

    const resultadoUpdate = await db.ProductDBController.CollectionModel.updateOne({ _id: args.producto._id }, { $set: updatedProduct });

    if (resultadoUpdate.modifiedCount > 0) {
        return { message: "Producto actualizado correctamente", successful: true }
    }

    return { message: "No se ha podido actualizar el producto", successful: false }
}

