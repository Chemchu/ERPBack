import { UserInputError } from "apollo-server-express";
import { Database } from "../../../databases/database"
import { EmpleadoFind, EmpleadosFind } from "../../../types/types";

export const empleadoResolver = async (parent: any, args: EmpleadoFind, context: any, info: any) => {
    if (args === null || !args || Object.keys(args).length === 0 && args.constructor === Object) throw new UserInputError('Argumentos inválidos: Find no puede estar vacío');

    const db = Database.Instance();

    if (args.find._id) {
        const e = await db.EmployeeDBController.CollectionModel.findOne({ _id: args.find._id }).exec();

        if (e) return e;
    }

    if (args.find.dni) {
        const e = await db.EmployeeDBController.CollectionModel.findOne({ dni: args.find.dni }).exec();

        if (e) return e;
    }

    if (args.find.nombre) {
        const e = await db.EmployeeDBController.CollectionModel.findOne({ nombre: { "$regex": args.find.nombre, "$options": "i" } }).exec();

        if (e) return e;
    }

    return null;
}

export const empleadosResolver = async (parent: any, args: EmpleadosFind, context: any, info: any) => {
    const db = Database.Instance();

    // Comprueba si find es null, undefined o vacío
    if (args.find === null || !args.find || Object.keys(args.find).length === 0 && args.find.constructor === Object) {
        const empleados = await db.EmployeeDBController.CollectionModel.find({}).limit(args.limit || 3000).exec();

        if (empleados) return empleados;
    }

    if (args.find?._id) {
        const empleados = await db.EmployeeDBController.CollectionModel.find({ _id: args.find._id })
            .limit(args.limit || 3000)
            .exec();

        if (empleados) return empleados;
    }

    if (args.find?.dni) {
        const empleados = await db.EmployeeDBController.CollectionModel.find({ dni: args.find.dni })
            .limit(args.limit || 3000)
            .exec();

        if (empleados) return empleados;
    }

    if (args.find?.nombre) {
        const empleados = await db.EmployeeDBController.CollectionModel.find({ nombre: args.find.nombre })
            .limit(args.limit || 3000)
            .exec();

        if (empleados) return empleados;
    }

    if (args.find?.rol) {
        const empleados = await db.EmployeeDBController.CollectionModel.find({ rol: args.find.rol })
            .limit(args.limit || 3000)
            .exec();

        if (empleados) return empleados;
    }

    return [];
}
