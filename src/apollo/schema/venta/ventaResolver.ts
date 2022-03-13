import mongoose from 'mongoose';
import { UserInputError } from "apollo-server-express";
import { Database } from "../../../databases/database"
import { VentaFind, VentasFind } from "../../../types/types";
import { ISale } from "../../../types/Venta";

export const ventaResolver = async (parent: any, args: VentaFind, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    if (args === null || !args || Object.keys(args).length === 0 && args.constructor === Object) throw new UserInputError('Argumentos inválidos: Find no puede estar vacío');

    const db = Database.Instance();

    if (args._id) {
        const venta = await db.VentasDBController.CollectionModel.findOne({ _id: args._id }).exec();

        if (venta) return venta;
    }

    return null;
}

export const ventasResolver = async (parent: any, args: VentasFind, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

    // Comprueba si find es null, undefined o vacío
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) {
        const ventas = await db.VentasDBController.CollectionModel.find({}).sort({ createdAt: args.order || "desc" }).limit(args.limit || 3000).skip(args.offset || 0).exec();

        if (ventas) return ventas;
    }

    if (args.find?.createdAt && args.find.tpv) {
        const ventas = await db.VentasDBController.CollectionModel.find({ tpv: args.find.tpv, "createdAt": { $gte: parseInt(args.find.createdAt), $lt: Date.now() } })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 3000)
            .skip(args.offset || 0)
            .exec();

        if (ventas) return ventas;
    }

    if (args.find?._ids) {
        const ventas = await db.VentasDBController.CollectionModel.find({ _id: args.find._ids })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 3000)
            .skip(args.offset || 0)
            .exec();

        if (ventas) return ventas;
    }

    if (args.find?.clienteId) {
        const ventas = await db.VentasDBController.CollectionModel.find({ $cliente: { _id: args.find.clienteId } })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 3000)
            .skip(args.offset || 0)
            .exec();

        if (ventas) return ventas;
    }

    if (args.find?.tipo) {
        const ventas = await db.VentasDBController.CollectionModel.find({ tipo: args.find.tipo })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 3000)
            .skip(args.offset || 0)
            .exec();

        if (ventas) return ventas;
    }

    if (args.find?.vendedorId) {
        const ventas = await db.VentasDBController.CollectionModel.find({ $vendidoPor: { _id: args.find.vendedorId } })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 3000)
            .skip(args.offset || 0)
            .exec();

        if (ventas) return ventas;
    }

    if (args.find?.createdAt) {
        const ventas = await db.VentasDBController.CollectionModel.find({ createdAt: args.find.createdAt })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 3000)
            .skip(args.offset || 0)
            .exec();

        if (ventas) return ventas;
    }

    if (args.find?.tpv) {
        const ventas = await db.VentasDBController.CollectionModel.find({ tpv: args.find.tpv })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 3000)
            .skip(args.offset || 0)
            .exec();

        if (ventas) return ventas;
    }

    return [];
}

export const addVentaResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    try {
        const db = Database.Instance();
        const saleToAdd: mongoose.Document<ISale> = new db.VentasDBController.CollectionModel({
            productos: args.fields.productos,
            dineroEntregadoEfectivo: args.fields.dineroEntregadoEfectivo,
            dineroEntregadoTarjeta: args.fields.dineroEntregadoTarjeta,
            precioVentaTotal: args.fields.precioVentaTotal,
            cambio: args.fields.cambio,
            cliente: args.fields.cliente,
            vendidoPor: args.fields.vendidoPor,
            modificadoPor: args.fields.modificadoPor,
            tipo: args.fields.tipo,
            descuentoEfectivo: args.fields.descuentoEfectivo,
            descuentoPorcentaje: args.fields.descuentoPorcentaje,
            tpv: args.fields.tpv
        } as ISale);

        const res = await saleToAdd.save();

        if (res.errors) {
            return { message: "No se ha podido añadir la venta a la base de datos", successful: false }
        }

        return { message: "Venta añadida con éxito", successful: true, _id: res._id }
    }
    catch (err) {
        return { message: err, successful: false }
    }
}

export const deleteVentaResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();
}

export const updateVentaResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

}

