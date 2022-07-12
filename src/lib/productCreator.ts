import { IProduct } from "../types/Producto";

export const CreateProduct = (jsonData: any): IProduct => {
    const producto: IProduct = {
        nombre: jsonData.NOMBRE || jsonData.nombre,
        proveedor: jsonData.PROVEEDOR || jsonData.proveedor,
        familia: jsonData.FAMILIA || jsonData.familia,
        precioVenta: jsonData.PRECIO_VENTA || jsonData.precioVenta,
        precioCompra: jsonData.PRECIO_COMPRA || jsonData.precioCompra,
        iva: jsonData.IVA || jsonData.iva || 0,
        margen: jsonData.MARGEN || jsonData.margen,
        promociones: jsonData.PROMOCIONES || jsonData.promociones,
        ean: jsonData.EAN || jsonData.ean,
        alta: jsonData.ALTA || jsonData.alta || true,
        cantidad: jsonData.CANTIDAD || jsonData.cantidad,
        cantidadRestock: jsonData.CANTIDAD_RESTOCK || jsonData.cantidadRestock,
    } as IProduct;

    return producto;
}

export const CreateProductList = (jsonDataArray: any): IProduct[] => {
    let productList: IProduct[] = [];
    for (var i = 0; i < jsonDataArray.length; i++) {
        const p = CreateProduct(jsonDataArray[i]);

        productList.push(p);
    }

    return productList;
}