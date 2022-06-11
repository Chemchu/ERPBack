import mongoose from 'mongoose';
import { UserInputError } from "apollo-server-express";
import { Database } from "../../../databases/database"
import { DevolucionFind, VentaFind } from "../../../types/types";
import { ISale } from "../../../types/Venta";
import { IDevolucion } from '../../../types/Devolucion';
import { IReturnProduct } from '../../../types/Producto';

export const devolucionResolver = async (parent: any, args: VentaFind, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    if (args === null || !args || Object.keys(args).length === 0 && args.constructor === Object) throw new UserInputError('Argumentos inválidos: Find no puede estar vacío');

    const db = Database.Instance();

    if (args._id) {
        const venta = await db.DevolucionDBController.CollectionModel.findOne({ _id: args._id }).exec();

        if (venta) return venta;
    }

    return null;
}

export const devolucionesResolver = async (parent: any, args: DevolucionFind, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

    // Comprueba si find es null, undefined o vacío
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) {
        const devoluciones = await db.DevolucionDBController.CollectionModel.find({}).sort({ createdAt: args.order || "desc" }).limit(args.limit || 500).skip(args.offset || 0).exec();

        if (devoluciones) return devoluciones;
    }

    if (args.find?.createdAt && args.find.tpv) {
        const devoluciones = await db.DevolucionDBController.CollectionModel.find({ tpv: args.find.tpv, "createdAt": { $gte: parseInt(args.find.createdAt), $lt: Date.now() } })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 500)
            .skip(args.offset || 0)
            .exec();

        if (devoluciones) return devoluciones;
    }

    if (args.find?._ids) {
        const devoluciones = await db.DevolucionDBController.CollectionModel.find({ _id: args.find._ids })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 500)
            .skip(args.offset || 0)
            .exec();

        if (devoluciones) return devoluciones;
    }

    if (args.find?.clienteId) {
        const devoluciones = await db.DevolucionDBController.CollectionModel.find({ $cliente: { _id: args.find.clienteId } })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 500)
            .skip(args.offset || 0)
            .exec();

        if (devoluciones) return devoluciones;
    }

    if (args.find?.vendedorId) {
        const devoluciones = await db.DevolucionDBController.CollectionModel.find({ $trabajador: { _id: args.find.vendedorId } })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 500)
            .skip(args.offset || 0)
            .exec();

        if (devoluciones) return devoluciones;
    }

    if (args.find?.createdAt) {
        const devoluciones = await db.DevolucionDBController.CollectionModel.find({ createdAt: args.find.createdAt })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 500)
            .skip(args.offset || 0)
            .exec();

        if (devoluciones) return devoluciones;
    }

    if (args.find?.tpv) {
        const devoluciones = await db.DevolucionDBController.CollectionModel.find({ tpv: args.find.tpv })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 500)
            .skip(args.offset || 0)
            .exec();

        if (devoluciones) return devoluciones;
    }

    if (args.find?.fechaInicial && args.find?.fechaFinal && !args.find.query) {
        const devoluciones = await db.DevolucionDBController.CollectionModel.find(
            {
                "createdAt":
                {
                    $gte: new Date(Number(args.find.fechaInicial)),
                    $lt: new Date(Number(args.find.fechaFinal))
                }
            })
            .sort({ createdAt: args.order || "desc" })
            .limit(args.limit || 500)
            .skip(args.offset || 0)
            .exec();

        if (devoluciones) return devoluciones;
    }

    if (args.find?.query) {
        const query = args.find.query;
        const isQueryValidId = mongoose.Types.ObjectId.isValid(query);

        let devoluciones = [];
        if (isQueryValidId) {
            devoluciones = await db.DevolucionDBController.CollectionModel.find({ _id: query })
                .limit(args.limit || 150)
                .exec();

            return devoluciones;
        }

        let queryConFecha: mongoose.FilterQuery<ISale>[] = [{}]
        let limite = args.limit || 150;

        if (args.find.fechaInicial && args.find.fechaFinal) {
            queryConFecha = [{
                "createdAt":
                {
                    $gte: new Date(Number(args.find.fechaInicial)),
                    $lt: new Date(Number(args.find.fechaFinal))
                }
            }];

            limite = 1000
        }

        const tpv = await db.TPVDBController.CollectionModel.findOne({ nombre: { "$regex": query, "$options": "i" } });
        if (tpv) {
            const r = await db.DevolucionDBController.CollectionModel.find({
                tpv: tpv._id,
                "createdAt":
                {
                    $gte: new Date(Number(args.find.fechaInicial)),
                    $lt: new Date(Number(args.find.fechaFinal))
                }
            })
                .limit(args.limit || 150)
                .exec();

            return [...r]
        }

        devoluciones = await db.DevolucionDBController.CollectionModel.find({
            $or: [
                { "productos.nombre": { "$regex": query, "$options": "i" } },
                { "productos.ean": { "$regex": query, "$options": "i" } },
                { "productos.proveedor": { "$regex": query, "$options": "i" } },
                { "productos.familia": { "$regex": query, "$options": "i" } },
                { "trabajador.nombre": { "$regex": query, "$options": "i" } },
                { "trabajador.email": { "$regex": query, "$options": "i" } },
                { "trabajador.dni": { "$regex": query, "$options": "i" } },
                { "trabajador.rol": { "$regex": query, "$options": "i" } },
                { "modificadoPor.nombre": { "$regex": query, "$options": "i" } },
                { "modificadoPor.email": { "$regex": query, "$options": "i" } },
                { "modificadoPor.dni": { "$regex": query, "$options": "i" } },
                { "modificadoPor.rol": { "$regex": query, "$options": "i" } },
                { "cliente.nombre": { "$regex": query, "$options": "i" } },
                { "cliente.nif": { "$regex": query, "$options": "i" } }
            ],
            $and: queryConFecha,
        })
            .limit(limite)
            .sort({ "createdAt": -1 })
            .exec();

        return devoluciones;
    }

    return [];
}

export const addDevolucionResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    try {
        const db = Database.Instance();
        const cliente = await db.ClientDBController.CollectionModel.findOne({ "_id": args.fields.cliente });
        const trabajador = await db.EmployeeDBController.CollectionModel.findOne({ "_id": args.fields.trabajador });
        let ventaOriginal = await db.VentasDBController.CollectionModel.findOne({ "_id": args.fields.ventaId });

        const devolucionToAdd: mongoose.Document<ISale> = new db.DevolucionDBController.CollectionModel({
            productosDevueltos: args.fields.productosDevueltos,
            dineroDevuelto: args.fields.dineroDevuelto,
            cliente: cliente,
            trabajador: trabajador,
            modificadoPor: trabajador,
            tpv: args.fields.tpv,
            ventaId: args.fields.ventaId,
            ventaOriginal: ventaOriginal
        } as IDevolucion);

        // Añadir nueva devolucion
        const res: any = await devolucionToAdd.save(); // ---> Uso de any como solución temporal

        let isUpdatingCorrectly = true;
        // Actualizar la cantidad de productos de la venta original
        args.fields.productosDevueltos.forEach(async (p: IReturnProduct) => {
            const err1 = await db.ProductDBController.CollectionModel.findOneAndUpdate({ _id: p._id }, { "$inc": { "cantidad": +p.cantidadDevuelta } });

            if (err1?.errors && isUpdatingCorrectly) {
                isUpdatingCorrectly = false;
            }
        });

        //ventaOriginal.

        // Comprueba si se ha añadido correctamente la venta a la base de datos
        if (res.errors) {
            return { message: "No se ha podido añadir la venta a la base de datos", successful: false }
        }

        // Comprueba si se han actualizado correctamente las cantidades de los productos
        if (!isUpdatingCorrectly) {
            return { message: "Venta añadida pero las cantidades no han sido actualizadas correctamente", successful: true }
        }

        return { message: "Venta añadida con éxito", successful: true, _id: res._id, createdAt: res.createdAt }
    }
    catch (err) {
        return { message: err, successful: false }
    }
}

export const deleteDevolucionResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();
}

export const updateDevolucionResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

}
