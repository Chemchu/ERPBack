"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProductoFileResolver = void 0;
const database_1 = require("../../../databases/database");
const processCSV_1 = require("../../../lib/processCSV");
const productCreator_1 = require("../../../lib/productCreator");
const uploadProductoFileResolver = (root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = database_1.Database.Instance();
        const pArray = (0, processCSV_1.ProcessCSV)(JSON.parse(args.csv));
        const auxProductList = (0, productCreator_1.CreateProductList)(pArray);
        let prodList = [];
        for (var i = 0; i < auxProductList.length; i++) {
            const prodName = auxProductList[i].nombre;
            const prodEAN = auxProductList[i].ean;
            const prodRepetidoEnCSV = prodList.some(p => p.nombre === auxProductList[i].nombre || p.ean === auxProductList[i].ean);
            const yaExisteProducto = yield db.ProductDBController.CollectionModel.exists({ nombre: prodName });
            if (yaExisteProducto || prodRepetidoEnCSV) {
                continue;
            }
            const yaExisteEAN = yield db.ProductDBController.CollectionModel.exists({ ean: prodEAN });
            if (yaExisteEAN) {
                continue;
            }
            prodList.push(auxProductList[i]);
        }
        yield db.ProductDBController.CollectionModel.insertMany(prodList);
        return { message: `Los productos han sido a??adidos en la base de datos`, successful: true };
    }
    catch (err) {
        console.log(err);
        return { message: `Error al a??adir los productos en la base de datos`, successful: false };
    }
});
exports.uploadProductoFileResolver = uploadProductoFileResolver;
