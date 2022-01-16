"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductList = exports.CreateProduct = void 0;
const CreateProduct = (jsonData) => {
    const producto = {
        nombre: jsonData.NOMBRE,
        proveedor: jsonData.PROVEEDOR,
        familia: jsonData.FAMILIA,
        precioVenta: jsonData.PRECIO_VENTA,
        precioCompra: jsonData.PRECIO_COMPRA,
        iva: jsonData.IVA || 0,
        margen: jsonData.MARGEN,
        promociones: jsonData.promociones,
        ean: jsonData.EAN,
        alta: jsonData.ALTA || true,
        cantidad: jsonData.CANTIDAD,
        cantidadRestock: jsonData.CANTIDAD_RESTOCK,
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
