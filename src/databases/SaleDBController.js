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
exports.SaleDBController = void 0;
class SaleDBController {
    constructor(modelo) {
        this.CollectionModel = modelo;
    }
    Add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const saleJSON = req.body;
            const saleToAdd = new this.CollectionModel({
                productos: saleJSON.productos,
                dineroEntregadoEfectivo: saleJSON.precioVentaEfectivo,
                dineroEntregadoTarjeta: saleJSON.precioVentaTarjeta,
                precioVentaTotal: saleJSON.precioVentaTotal,
                cambio: saleJSON.cambio,
                cliente: saleJSON.clientID,
                vendidoPor: saleJSON.empleadoID,
                modificadoPor: saleJSON.empleadoID,
                tipo: saleJSON.tipo,
                descuentoEfectivo: saleJSON.dtoEfectivo,
                descuentoTarjeta: saleJSON.dtoTarjeta,
            });
            try {
                yield saleToAdd.save();
                res.status(200).json({ message: `La venta ha sido añadido en la base de datos`, success: true });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: `Error al añadir la venta a la base de datos: ${err}`, success: false });
            }
        });
    }
    GetAll(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saleArray = yield this.CollectionModel.find({}).sort({ 'createdAt': -1 });
                res.status(200).json({ message: saleArray, success: true });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: `Error al buscar las ventas: ${err}`, success: false });
            }
        });
    }
    Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saleDate = req.params.id;
                const sales = yield this.CollectionModel.find({
                    'created_at': new Date(saleDate)
                }).exec();
                res.status(200).json({ message: sales, success: true });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: `Error al buscar las ventas: ${err}`, success: false });
            }
        });
    }
    GetDBState(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const databaseState = yield this.CollectionModel.find({ "databaseState": { $ne: null } });
                res.status(200).json({ message: databaseState, success: true });
            }
            catch (err) {
                res.status(500).json({ message: `Error al buscar el databaseState: ${err}`, success: false });
            }
        });
    }
    Remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const saleID = req.params.id;
            try {
                const saleDeleted = yield this.CollectionModel.deleteOne({ _id: saleID });
                if (saleDeleted.deletedCount > 0) {
                    res.status(200).json({ message: `La venta ${saleID} ha sido borrada correctamente de la base de datos`, success: true });
                    return;
                }
                res.status(200).json({ message: `Error al borrar ${saleID} de la base de datos: la venta no existe`, success: false });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: `Error al borrar ${saleID} de la base de datos: ${err}`, success: false });
            }
        });
    }
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const saleToUpdate = req.params.id;
            try {
                const saleJSON = req.body;
                const saleUpdated = yield this.CollectionModel.updateOne({ _id: saleToUpdate }, {
                    productos: saleJSON.productsID,
                    precioVentaTotal: saleJSON.precioVentaTotal,
                    cambio: saleJSON.cambio,
                    cliente: saleJSON.clientID,
                    tipo: saleJSON.tipo
                });
                if (saleUpdated.modifiedCount > 0) {
                    res.status(200).json({ message: `La venta ${saleToUpdate} ha sido actualizada correctamente`, success: true });
                    return;
                }
                res.status(200).json({ message: `Error al actualizar ${saleToUpdate} en la base de datos: la venta no existe`, success: false });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: `Error al actualizar ${saleToUpdate} en la base de datos: ${err}`, success: false });
            }
        });
    }
}
exports.SaleDBController = SaleDBController;
