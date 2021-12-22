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
exports.ProductoDBController = void 0;
class ProductoDBController {
    constructor(modelo) {
        this.CollectionModel = modelo;
    }
    Add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prodJSON = req.body;
                const productoToAdd = new this.CollectionModel({
                    nombre: prodJSON.nombre,
                    descripcion: prodJSON.descripcion,
                    familia: prodJSON.familia,
                    precioVenta: prodJSON.precioVenta,
                    precioCompra: prodJSON.precioCompra,
                    iva: prodJSON.iva,
                    ean: prodJSON.ean,
                    alta: prodJSON.alta,
                    tags: prodJSON.tags,
                    cantidad: prodJSON.cantidad,
                    img: Buffer.from(prodJSON.img, 'base64')
                });
                const prodName = productoToAdd.get('nombre');
                const prodEAN = productoToAdd.get('ean');
                const yaExisteProducto = yield this.CollectionModel.exists({ nombre: prodName });
                if (yaExisteProducto) {
                    res.status(200).json({ message: `Error al añadir ${prodJSON.nombre} en la base de datos: nombre en uso`, success: false });
                    return;
                }
                const yaExisteEAN = yield this.CollectionModel.exists({ ean: prodEAN });
                if (yaExisteEAN) {
                    res.status(200).json({ message: `Error al añadir ${prodJSON.nombre} en la base de datos: EAN en uso`, success: false });
                    return;
                }
                yield productoToAdd.save();
                res.status(200).json({ message: `El producto ${prodName} ha sido añadido en la base de datos`, success: true });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: `Error al añadir el producto en la base de datos`, success: false });
            }
        });
    }
    GetAll(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prodArray = yield this.CollectionModel.find({});
                res.status(200).json({ message: prodArray, success: true });
            }
            catch (err) {
                res.status(500).json({ message: `Error al buscar los productos: ${err}`, success: false });
            }
        });
    }
    Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const prodAttr = req.params.id;
                const products = yield this.CollectionModel.find({
                    $or: [{ 'nombre': { $regex: prodAttr, $options: "i" } }, { 'familia': { $regex: prodAttr, $options: "i" } }, { 'EAN': { $regex: prodAttr, $options: "i" } }]
                }).exec();
                res.status(200).json({ message: products, success: true });
            }
            catch (err) {
                res.status(500).json({ message: `Error al buscar los productos: ${err}`, success: false });
            }
        });
    }
    GetDBState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbState = yield this.CollectionModel.find({}).select('databaseState');
                let resState;
                dbState.forEach(d => {
                    console.log(d.databaseState);
                    if (d.databaseState) {
                        console.log(d);
                        resState = d;
                    }
                });
                res.status(200).json({ message: resState, success: true });
            }
            catch (err) {
                res.status(500).json({ message: `Error al buscar el databaseState: ${err}`, success: false });
            }
        });
    }
    Remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productName = req.params.id;
            try {
                const productDeleted = yield this.CollectionModel.deleteOne({ nombre: productName });
                if (productDeleted.deletedCount > 0) {
                    res.status(200).json({ message: `El producto ${productName} ha sido borrado correctamente de la base de datos`, success: true });
                    return;
                }
                res.status(200).json({ message: `Error al borrar ${productName} de la base de datos: el producto no existe`, success: false });
            }
            catch (err) {
                res.status(500).json({ message: `Error al borrar ${productName} de la base de datos: ${err}`, success: false });
            }
        });
    }
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productoToUpdateId = req.params.id;
            try {
                const prodJSON = req.body;
                const productUpdated = yield this.CollectionModel.updateOne({ _id: productoToUpdateId }, {
                    nombre: prodJSON.nombre,
                    descripcion: prodJSON.descripcion,
                    familia: prodJSON.familia,
                    precioVenta: prodJSON.precioVenta,
                    precioCompra: prodJSON.precioCompra,
                    iva: prodJSON.iva,
                    ean: prodJSON.ean,
                    alta: prodJSON.alta,
                    tags: prodJSON.tags,
                    cantidad: prodJSON.cantidad,
                    img: Buffer.from(prodJSON.img, 'base64')
                });
                if (productUpdated.modifiedCount > 0) {
                    res.status(200).json({ message: `El producto ${productoToUpdateId} ha sido actualizado correctamente`, success: true });
                    return;
                }
                res.status(200).json({ message: `Error al actualizar ${productoToUpdateId} en la base de datos: el producto no existe`, success: false });
            }
            catch (err) {
                res.status(500).json({ message: `Error al actualizar ${productoToUpdateId} en la base de datos: ${err}`, success: false });
            }
        });
    }
}
exports.ProductoDBController = ProductoDBController;
