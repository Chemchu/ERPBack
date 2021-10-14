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
            const prodJSON = req.body;
            const productoToAdd = new this.CollectionModel({
                nombre: prodJSON.nombre,
                descripcion: prodJSON.descripcion,
                familia: prodJSON.familia,
                precioVenta: prodJSON.precioVenta,
                precioCompra: prodJSON.precioCompra,
                IVA: prodJSON.IVA,
                EAN: [prodJSON.EAN],
                alta: prodJSON.alta,
                tags: prodJSON.tags,
                cantidad: prodJSON.cantidad
            });
            const prodName = productoToAdd.get('nombre');
            const prodEAN = productoToAdd.get('EAN');
            try {
                const yaExisteProducto = yield this.CollectionModel.exists({ nombre: prodName });
                if (yaExisteProducto)
                    return res.status(200).json({ message: `Error al añadir ${prodJSON.nombre} en la BBDD: nombre en uso`, success: false });
                const yaExisteEAN = yield this.CollectionModel.exists({ EAN: prodEAN });
                if (yaExisteEAN)
                    return res.status(200).json({ message: `Error al añadir ${prodJSON.nombre} en la BBDD: EAN en uso`, success: false });
                yield productoToAdd.save();
                return res.status(200).json({ message: `El producto ${prodName} ha sido añadido en la base de datos`, success: true });
            }
            catch (err) {
                return res.status(500).json({ message: `Error al añadir ${prodJSON.nombre} a la BBDD: ${err}`, success: false });
            }
        });
    }
    GetAll(res) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            try {
                const prodArray = yield this.CollectionModel.find(filter);
                return res.status(200).json({ message: prodArray, success: true });
            }
            catch (err) {
                return res.status(500).json({ message: `Error al buscar los productos: ${err}`, success: false });
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
                return res.status(200).json({ message: products, success: true });
            }
            catch (err) {
                return res.status(500).json({ message: `Error al buscar los productos: ${err}`, success: false });
            }
        });
    }
    Remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productName = req.params.id;
            try {
                const productDeleted = yield this.CollectionModel.deleteOne({ nombre: productName });
                if (productDeleted.deletedCount > 0) {
                    return res.status(200).json({ message: `El producto ${productName} ha sido borrado correctamente de la base de datos`, success: true });
                }
                return res.status(200).json({ message: `Error al borrar ${productName} de la BBDD: el producto no existe`, success: false });
            }
            catch (err) {
                return res.status(500).json({ message: `Error al borrar ${productName} de la BBDD: ${err}`, success: false });
            }
        });
    }
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productoToUpdate = req.params.id;
            try {
                const prodJSON = req.body;
                const productUpdated = yield this.CollectionModel.updateOne({ nombre: productoToUpdate }, {
                    nombre: prodJSON.nombre,
                    descripcion: prodJSON.descripcion,
                    familia: prodJSON.familia,
                    precioVenta: prodJSON.precioVenta,
                    precioCompra: prodJSON.precioCompra,
                    IVA: prodJSON.IVA,
                    EAN: prodJSON.EAN,
                    alta: prodJSON.alta,
                    tags: prodJSON.tags,
                    cantidad: prodJSON.cantidad
                });
                if (productUpdated.modifiedCount > 0) {
                    return res.status(200).json({ message: `El producto ${productoToUpdate} ha sido actualizado correctamente`, success: true });
                }
                return res.status(200).json({ message: `Error al actualizar ${productoToUpdate} en la BBDD: el producto no existe`, success: false });
            }
            catch (err) {
                return res.status(500).json({ message: `Error al actualizar ${productoToUpdate} en la BBDD: ${err}`, success: false });
            }
        });
    }
}
exports.ProductoDBController = ProductoDBController;
