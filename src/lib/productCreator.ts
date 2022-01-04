import { IProduct } from "../types/Producto";

export const CreateProduct = (jsonData: any): IProduct => {

    const producto: IProduct = {
        nombre: jsonData.NOMBRE,
        proveedor: jsonData.PROVEEDOR,
        familia: jsonData.FAMILIA,
        precioVenta: jsonData.PRECIO_VENTA,
        precioCompra: jsonData.PRECIO_COMPRA,
        iva: jsonData.IVA,
        margen: jsonData.MARGEN,
        promociones: jsonData.promociones,
        ean: jsonData.EAN,
        alta: jsonData.ALTA || false,
        cantidad: jsonData.CANTIDAD,
        cantidadRestock: jsonData.CANTIDAD_RESTOCK,
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