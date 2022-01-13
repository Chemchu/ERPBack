import { UserInputError } from "apollo-server-express";
import { Database } from "../../../databases/database"
import { Credentials } from "../../../types/types";
var bcrypt = require('bcryptjs');
import jwt from "jsonwebtoken";

export const loginResolver = async (parent: any, args: Credentials, context: any, info: any) => {
    if (args === null || !args || Object.keys(args).length === 0 && args.constructor === Object) throw new UserInputError('Argumentos inválidos: Find no puede estar vacío');
    if (!args.loginValues.email || !args.loginValues.password) { throw new UserInputError('Usuario y/o contraseña no pueden estar vacíos'); }

    try {
        const db = Database.Instance();

        const empleado = await db.EmployeeDBController.CollectionModel.findOne({ email: args.loginValues.email }).exec();
        if (!empleado) { return { message: "Usuario y/o contraseña incorrectas", success: false, token: null } }

        let doesPasswordsMatch = await bcrypt.compare(args.loginValues.password, empleado?.hashPassword);
        if (!doesPasswordsMatch) { return { message: "Usuario y/o contraseña incorrectas", success: false, token: null } }

        // Secret Key
        const secret = process.env.JWT_SECRET;

        if (secret) {
            //Login JWT payload
            const payload = { _id: empleado._id, nombre: empleado.nombre, email: empleado.email, rol: empleado.rol };
            const jwtHoursDuration = process.env.JWT_HOURS_DURATION || 1;

            // Create Token Expires in 1 hour
            const token = await jwt.sign(payload, secret, {
                expiresIn: 3600 * Number(jwtHoursDuration)
            });

            // Finally return user token
            return {
                message: "Autenticación realizada con éxito",
                success: true,
                token: `Bearer ${token}`
            };
        }

        return { message: "Usuario y/o contraseña incorrectas", success: false, token: null }
    }
    catch (err) {
        return { message: "Usuario y/o contraseña incorrectas", success: false, token: null }
    }
}
