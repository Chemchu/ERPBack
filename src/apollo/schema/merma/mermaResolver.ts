import { UserInputError } from "apollo-server-express";
import mongoose, { SortOrder } from "mongoose";
import { Database } from "../../../databases/database"
import { IMerma } from "../../../types/Merma";
import { IProduct, IProductoMermado } from "../../../types/Producto";
import { MermaFind, MermaInput, MermasFind, NuevoProductoMermado } from "../../../types/types";

export const mermaResolver = async (parent: any, args: MermaFind, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    if (!args.find._id) throw new UserInputError('Argumentos inválidos: Find no puede estar vacío');

    const db = Database.Instance();

    if (args.find._id) {
        const merma = await db.MermaDBController.CollectionModel.findOne({ _id: args.find._id }).exec();

        if (merma) return merma;
    }
    return null;
}

export const mermasResolver = async (parent: any, args: MermasFind, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();
    let order: SortOrder = "desc";

    if (args.find?.empleadoId) {
        const mermas = await db.MermaDBController.CollectionModel.find({ "creadoPor._id": args.find.empleadoId })
            .limit(args.limit || 150)
            .exec();

        return mermas;
    }

    if (args.find?.fechaFinal && args.find?.fechaFinal) {
        const mermas = await db.MermaDBController.CollectionModel.find(
            {
                "createdAt":
                {
                    $gte: new Date(Number(args.find.fechaInicial)),
                    $lt: new Date(Number(args.find.fechaFinal))
                }
            })
            .sort({ createdAt: order })
            .limit(args.limit || 1000)
            .exec();

        if (mermas) return mermas;
    }

    return await db.MermaDBController.CollectionModel.find()
        .sort({ createdAt: order })
        .limit(args.limit || 150)
        .exec();
}

export const addMermaResolver = async (root: any, args: { merma: MermaInput }, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }
    try {
        const db = Database.Instance();

        const empleado = await db.EmployeeDBController.CollectionModel.findOne({ _id: args.merma.empleadoId });
        if (empleado === null) { return { message: "El empleado no existe en el sistema", successful: false } }

        const costes = await CalcularMermaValues(args.merma.productos);
        const productosMermados = await GetProductosMermados(args.merma.productos)
        const merma: IMerma = {
            productos: productosMermados,
            creadoPor: empleado,
            costeProductos: costes.costeProductos,
            ventasPerdidas: costes.ventas,
            beneficioPerdido: costes.beneficio
        } as unknown as IMerma

        const updatedProduct: mongoose.Document<IMerma> = new db.MermaDBController.CollectionModel(merma);
        const resultado = await updatedProduct.save();
        if (resultado.id) {
            return { message: "Merma añadido correctamente", successful: true, }
        }

        return { message: "No se ha podido añadir el merma", successful: false }
    }
    catch (err) {
        return { message: err, successful: false }
    }
}

export const deleteMermaResolver = async (root: any, args: { _id: string }, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }
    try {
        const db = Database.Instance();

        const isQueryValidId = mongoose.Types.ObjectId.isValid(args._id);
        if (!isQueryValidId) {
            return { message: "ID de merma inválido", successful: false }
        }

        const deletedProd = await db.MermaDBController.CollectionModel.deleteOne({ _id: args._id });

        if (deletedProd.deletedCount > 0) {
            return { message: "merma eliminado correctamente", successful: true }
        }

        return { message: "No se ha podido eliminar el merma", successful: false }
    } catch (err) {
        return { message: err, successful: false }
    }
}

export const updateMermaResolver = async (root: any, args: { input: { _id: string, merma: MermaInput } }, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    try {
        const db = Database.Instance();
        const isQueryValidId = mongoose.Types.ObjectId.isValid(args.input._id);
        if (!isQueryValidId) {
            return { message: "ID de merma inválido", successful: false }
        }

        const empleado = await db.EmployeeDBController.CollectionModel.findOne({ _id: args.input.merma.empleadoId });
        if (empleado === null) { return { message: "El empleado no existe en el sistema", successful: false } }

        const mermaVieja = await db.MermaDBController.CollectionModel.findOne({ _id: args.input._id });
        if (!mermaVieja) { return { message: "La merma a actualizar no existe en el sistema", successful: false } }

        const costes = await CalcularMermaValues(args.input.merma.productos);
        const productosMermados = await GetProductosMermados(args.input.merma.productos)
        const updatedMerma = {
            productos: productosMermados,
            creadoPor: args.input.merma.empleadoId,
            costeProductos: costes.costeProductos,
            ventasPerdidas: costes.ventas,
            beneficioPerdido: costes.beneficio,
        } as unknown as IMerma;

        const resultadoUpdate = await db.MermaDBController.CollectionModel.updateOne({ _id: args.input._id }, { $set: updatedMerma });
        if (resultadoUpdate.modifiedCount > 0) {
            return { message: "Merma actualizada correctamente", successful: true }
        }

        return { message: "No se ha podido actualizar el merma", successful: false }
    }
    catch (err) {
        return { message: err, successful: false }
    }
}

const CalcularMermaValues = async (productosMermados: NuevoProductoMermado[]): Promise<{ costeProductos: number, ventas: number, beneficio: number }> => {
    const db = Database.Instance();
    const prodMap = new Map<string, IProduct>();
    await db.ProductDBController.CollectionModel
        .find()
        .cursor()
        .eachAsync(prod => {
            prodMap.set(prod._id, prod)
        })

    let costes: { costeProductos: number, ventas: number, beneficio: number } = { costeProductos: 0, ventas: 0, beneficio: 0 }
    for (let index = 0; index < productosMermados.length; index++) {
        const prodMermado = productosMermados[index];
        const producto = prodMap.get(prodMermado._id);

        if (!producto) { throw "El producto añadido a la merma no existe en el sistema" }

        costes.costeProductos += producto.precioCompra * prodMermado.cantidad;
        costes.ventas += producto.precioVenta * prodMermado.cantidad;
        costes.beneficio += ((producto.precioVenta / (1 + (producto.iva / 100))) - producto.precioCompra) * prodMermado.cantidad;
    }

    return costes;
}

const GetProductosMermados = async (productosMermados: NuevoProductoMermado[]): Promise<IProductoMermado[]> => {
    const db = Database.Instance()
    const prodMap = new Map<string, IProduct>();
    await db.ProductDBController.CollectionModel
        .find()
        .cursor()
        .eachAsync(prod => {
            prodMap.set(prod._id, prod)
        })

    let resultado = []
    for (let index = 0; index < productosMermados.length; index++) {
        const productoMermado = productosMermados[index];
        const prod = prodMap.get(productoMermado._id);

        if (!prod) { throw "El producto añadido a la merma no existe en el sistema" }

        const pRes = {
            nombre: prod.nombre,
            proveedor: prod.proveedor,
            cantidad: prod.cantidad,
            familia: prod.familia,
            margen: prod.margen,
            ean: prod.ean,
            iva: prod.iva,
            precioCompra: prod.precioCompra,
            precioVenta: prod.precioVenta,
            motivo: productoMermado.motivo,
        } as IProductoMermado

        resultado.push(pRes);
    }

    return resultado;
}