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

    //     public async Add(req: Request, res: Response): Promise < void> {
    //     // El empleado en JSON de la petición
    //     const employeeJSON = req.body;
    //     let hashedPassword = await bcrypt.hash(employeeJSON.password, salt);

    //     // Crea el empleado
    //     const employeeToAdd: mongoose.Document < IEmployee > = new this.CollectionModel({
    //         nombre: employeeJSON.nombre,
    //         apellidos: employeeJSON.apellidos,
    //         dni: employeeJSON.dni,
    //         genero: employeeJSON.genero,
    //         email: employeeJSON.email,
    //         hashPassword: hashedPassword,
    //         horasPorSemana: employeeJSON.horasPorSemana,
    //         fechaAlta: employeeJSON.fechaAlta,
    //     });

    //     try {
    //         const empleadoExistente = await this.CollectionModel.exists({ dni: employeeJSON.dni });
    //         if(empleadoExistente) { res.status(200).json({ message: `Error al añadir el empleado en la base de datos: el empleado ya existe`, success: false }); return; }

    // 			await employeeToAdd.save();
    //         res.status(200).json({ message: `El empleado ha sido añadido en la base de datos`, success: true });
    //     }
    // 		catch(err) {
    //         res.status(500).json({ message: `Error al añadir el empleado en la base de datos: ${err}`, success: false });
    //     }
    // }

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
