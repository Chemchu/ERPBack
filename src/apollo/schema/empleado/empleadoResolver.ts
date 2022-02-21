import { UserInputError } from "apollo-server-express";
import { Database } from "../../../databases/database"
import { EmpleadoFind, EmpleadosFind } from "../../../types/types";

export const empleadoResolver = async (parent: any, args: EmpleadoFind, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) throw new UserInputError('Argumentos inválidos: Find no puede estar vacío');

    const db = Database.Instance();

    if (args.find._id) {
        let e = await db.EmployeeDBController.CollectionModel.findOne({ _id: args.find._id }).exec();

        if (e) { e.hashPassword = "undefined"; return e; }
    }

    if (args.find.dni) {
        let e = await db.EmployeeDBController.CollectionModel.findOne({ dni: args.find.dni }).exec();

        if (e) { e.hashPassword = "undefined"; return e; }
    }

    if (args.find.nombre) {
        let e = await db.EmployeeDBController.CollectionModel.findOne({ nombre: { "$regex": args.find.nombre, "$options": "i" } }).exec();

        if (e) { e.hashPassword = "undefined"; return e; }
    }

    return null;
}

export const empleadosResolver = async (parent: any, args: EmpleadosFind, context: any, info: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

    // Comprueba si find es null, undefined o vacío
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) {
        let empleados = await db.EmployeeDBController.CollectionModel.find({}).limit(args.limit || 3000).exec();

        if (empleados) {
            empleados.forEach((e) => {
                e.hashPassword = "undefined";
            })
            return empleados;
        }
    }

    if (args.find?._ids) {
        let empleados = await db.EmployeeDBController.CollectionModel.find({ _id: args.find._ids })
            .limit(args.limit || 3000)
            .exec();

        if (empleados) {
            empleados.forEach((e) => {
                e.hashPassword = "undefined";
            })
            return empleados;
        }
    }

    if (args.find?.nombre) {
        let empleados = await db.EmployeeDBController.CollectionModel.find({ nombre: args.find.nombre })
            .limit(args.limit || 3000)
            .exec();

        if (empleados) {
            empleados.forEach((e) => {
                e.hashPassword = "undefined";
            })
            return empleados;
        }
    }

    if (args.find?.rol) {
        let empleados = await db.EmployeeDBController.CollectionModel.find({ rol: args.find.rol })
            .limit(args.limit || 3000)
            .exec();

        if (empleados) {
            empleados.forEach((e) => {
                e.hashPassword = "undefined";
            })
            return empleados;
        }
    }

    return [];
}

export const addEmpleadoResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

}

export const deleteEmpleadoResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();
}

export const updateEmpleadoResolver = async (root: any, args: any, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    const db = Database.Instance();

}
