"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductList = exports.CreateProduct = void 0;
const CreateProduct = (jsonData) => {
    const producto = {
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
    };
    return producto;
};
exports.CreateProduct = CreateProduct;
const CreateProductList = (jsonDataArray) => {
    let productList = [];
    for (var i = 0; i < jsonDataArray.length; i++) {
        const p = (0, exports.CreateProduct)(jsonDataArray[i]);
        productList.push(p);
    }
    return productList;
};
exports.CreateProductList = CreateProductList;
