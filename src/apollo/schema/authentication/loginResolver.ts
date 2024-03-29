import { UserInputError } from "apollo-server-express";
import { Database } from "../../../databases/database";
import { Credentials, JWTPayload } from "../../../types/types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginResolver = async (
  parent: any,
  args: Credentials,
  context: any,
  info: any
) => {
  if (
    args === null ||
    !args ||
    (Object.keys(args).length === 0 && args.constructor === Object)
  )
    throw new UserInputError("Argumentos inválidos: Find no puede estar vacío");
  if (!args.loginValues.email || !args.loginValues.password) {
    throw new UserInputError("Usuario y/o contraseña no pueden estar vacíos");
  }

  try {
    const db = Database.Instance();

    const empleado = await db.EmployeeDBController.CollectionModel.findOne({
      email: String(args.loginValues.email).toLowerCase(),
    }).exec();
    if (!empleado) {
      return {
        message: "El usuario no existe",
        success: false,
        token: null,
      };
    }

    const passwordsMatch = await bcrypt.compare(
      args.loginValues.password,
      empleado?.hashPassword
    );
    if (!passwordsMatch) {
      return {
        message: "Contraseña incorrecta",
        success: false,
        token: null,
      };
    }

    // Secret Key
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return {
        message: "DEV_ERROR: JWT secret does not exists",
        successful: false,
        token: null,
      };
    }
    // Comprobar que el usuario está usando la TPV Y que la propiedad "libre" sea falsa (TPV ocupada actualmente)
    const tpv = await db.TPVDBController.CollectionModel.findOne({
      "enUsoPor._id": empleado._id,
      libre: false,
    }).exec();

    //Login JWT payload
    let payload;
    if (tpv) {
      payload = {
        _id: empleado._id,
        nombre: empleado.nombre,
        apellidos: empleado.apellidos,
        email: String(empleado.email).toLowerCase(),
        rol: empleado.rol,
        TPV: tpv._id,
      } as JWTPayload;
    } else {
      payload = {
        _id: empleado._id,
        nombre: empleado.nombre,
        apellidos: empleado.apellidos,
        email: String(empleado.email).toLowerCase(),
        rol: empleado.rol,
      } as JWTPayload;
    }
    const jwtHoursDuration = process.env.JWT_HOURS_DURATION || 1;

    // Create Token Expires in 1 hour
    const token = jwt.sign(payload, secret, {
      expiresIn: 3600 * Number(jwtHoursDuration),
    });

    // Finally return user token
    return {
      message: "Autenticación realizada con éxito",
      successful: true,
      token: `Bearer ${token}`,
    };
  } catch (err) {
    return {
      message: "Error: " + err,
      successful: false,
      token: null,
    };
  }
};
