import { Database } from "../../../databases/database";
import { CreateCierreList } from "../../../lib/cierreCreator";
import { ProcessCSV } from "../../../lib/processCSV";
import { CreateProductList } from "../../../lib/productCreator";
import { CreateSaleList } from "../../../lib/salesCreator";
import { IClient } from "../../../types/Cliente";
import { IEmployee } from "../../../types/Empleado";
import { IProduct } from "../../../types/Producto";
import { ICierreTPV, ITPV } from "../../../types/TPV";
import { ISale } from "../../../types/Venta";

export const uploadProductoFileResolver = async (root: any, args: { csv: string }, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    try {
        const db = Database.Instance();
        // El producto en JSON de la peticións
        const pArray = ProcessCSV(JSON.parse(args.csv));

        const auxProductList: IProduct[] = CreateProductList(pArray);
        let prodList: IProduct[] = [];

        for (var i = 0; i < auxProductList.length; i++) {
            if (!IsProductValid(auxProductList[i])) { continue; }

            const prodName = auxProductList[i].nombre;
            const prodEAN = auxProductList[i].ean;

            const prodRepetidoEnCSV = prodList.some(p => p.nombre === auxProductList[i].nombre || p.ean === auxProductList[i].ean);
            const yaExisteProducto = await db.ProductDBController.CollectionModel.exists({ nombre: prodName });

            if (yaExisteProducto || prodRepetidoEnCSV) { continue; }

            const yaExisteEAN = await db.ProductDBController.CollectionModel.exists({ ean: prodEAN });
            if (yaExisteEAN) { continue; }

            prodList.push(auxProductList[i]);
        }

        // Solo se añaden productos no existentes
        await db.ProductDBController.CollectionModel.insertMany(prodList);

        return { message: `Los productos han sido añadidos en la base de datos`, successful: true };
    }
    catch (err) {
        console.log(err);
        return { message: `Error al añadir los productos en la base de datos`, successful: false };
    }
}

export const uploadClientesFileResolver = async (root: any, args: { csv: string }, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    try {
        const db = Database.Instance();
        // El producto en JSON de la peticións
        const pArray = ProcessCSV(JSON.parse(args.csv));

        // const auxProductList: IClient[] = CreateProductList(pArray);
        // let prodList: IClient[] = [];

        // for (var i = 0; i < auxProductList.length; i++) {
        //     if (!IsProductValid(auxProductList[i])) { continue; }

        //     const prodName = auxProductList[i].nombre;
        //     const prodEAN = auxProductList[i].ean;

        //     const prodRepetidoEnCSV = prodList.some(p => p.nombre === auxProductList[i].nombre || p.ean === auxProductList[i].ean);
        //     const yaExisteProducto = await db.ProductDBController.CollectionModel.exists({ nombre: prodName });

        //     if (yaExisteProducto || prodRepetidoEnCSV) { continue; }

        //     const yaExisteEAN = await db.ProductDBController.CollectionModel.exists({ ean: prodEAN });
        //     if (yaExisteEAN) { continue; }

        //     prodList.push(auxProductList[i]);
        // }

        // // Solo se añaden productos no existentes
        // await db.ProductDBController.CollectionModel.insertMany(prodList);

        return { message: `Los clientes han sido añadidos en la base de datos`, successful: true };
    }
    catch (err) {
        console.log(err);
        return { message: `Error al añadir los clientes en la base de datos`, successful: false };
    }

}

export const uploadVentasFileResolver = async (root: any, args: { ventasJson: string }, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    try {
        const db = Database.Instance();
        const ventasJson = JSON.parse(JSON.parse(args.ventasJson));
        let tpv = await db.TPVDBController.CollectionModel.findOne({ nombre: { "$regex": ventasJson[0].tpv, "$options": "i" } })

        if (!tpv) {
            tpv = new db.TPVDBController.CollectionModel({
                nombre: `TPV${ventasJson[0].tpv}`,
                libre: true,
                cajaInicial: 0,
                enUsoPor: {
                    nombre: "",
                    apellidos: "",
                    dni: "",
                    rol: "",
                    email: "",
                } as IEmployee
            } as ITPV);

            if (!tpv) { return { message: `Error al añadir las ventas. Ninguna TPV asociada a dichas ventas`, successful: false } }
        }

        let ventas: ISale[] = []

        for (let i = 0; i < ventasJson.length; i++) {
            let v = ventasJson[i];
            v.tpv = tpv._id;

            ventas.push(v);
        }

        await db.VentasDBController.CollectionModel.insertMany(ventas);

        return { message: `Las ventas han sido añadidas en la base de datos`, successful: true };
    }
    catch (err) {
        console.log(err);
        return { message: `Error al añadir las ventas en la base de datos`, successful: false };
    }

}

export const uploadCierresFileResolver = async (root: any, args: { csv: string }, context: any) => {
    // Check de autenticidad para aceptar peticiones válidas. Descomentar en producción
    // if (!context.user) { throw new UserInputError('Usuario sin autenticar'); }

    try {
        const db = Database.Instance();
        // El producto en JSON de la peticións
        const cArray = ProcessCSV(JSON.parse(args.csv));
        let auxCierreList: ICierreTPV[];
        const empleadoObject = await db.EmployeeDBController.CollectionModel.find({});
        const empleado = empleadoObject.pop()
        if (!empleado) {
            return { message: `No se pueden añadir cierres sin al menos un empleado en el sistema`, successful: false };
        }
        const tpv = await db.TPVDBController.CollectionModel.findOne({ nombre: cArray[0].TPV })
        if (!tpv) {
            return { message: `No se pueden añadir cierres de una TPV no existente`, successful: false };
        }

        auxCierreList = CreateCierreList(cArray, empleado, tpv._id);
        // Solo se añaden productos no existentes
        await db.CierreTPVDBController.CollectionModel.insertMany(auxCierreList);
        return { message: `Los cierres se han añadidos a la base de datos`, successful: true };
    }
    catch (err) {
        console.log(err);
        return { message: `Error al añadir los cierres en la base de datos`, successful: false };
    }
}

const IsProductValid = (producto: IProduct): boolean => {
    if (!producto.nombre || producto.nombre === null || producto.nombre === undefined) { return false; }
    if (producto.precioCompra === undefined || producto.precioCompra < 0) { return false; }
    if (producto.precioVenta === undefined || producto.precioVenta < 0) { return false; }
    if (producto.ean === undefined || producto.ean === null || !producto.ean) { return false; }

    return true;
}