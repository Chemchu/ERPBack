import { Database } from "../../../databases/database";
import { ProcessCSV } from "../../../lib/processCSV";
import { CreateProductList } from "../../../lib/productCreator";
import { IProduct } from "../../../types/Producto";

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

const IsProductValid = (producto: IProduct): boolean => {
    if (!producto.nombre || producto.nombre === null || producto.nombre === undefined) { return false; }
    if (producto.precioCompra === undefined || producto.precioCompra < 0) { return false; }
    if (producto.precioVenta === undefined || producto.precioVenta < 0) { return false; }
    if (producto.ean === undefined || producto.ean === null || !producto.ean) { return false; }

    return true;
}