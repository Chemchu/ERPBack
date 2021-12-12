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
exports.ClientDBController = void 0;
class ClientDBController {
    constructor(modelo) {
        this.CollectionModel = modelo;
    }
    Add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientJSON = req.body;
            const clientToAdd = new this.CollectionModel({
                nif: clientJSON.nif,
                nombre: clientJSON.nombre,
                calle: clientJSON.calle,
                cp: clientJSON.cp,
            });
            try {
                yield clientToAdd.save();
                res.status(200).json({ message: `El cliente ha sido añadido en la base de datos`, success: true });
            }
            catch (err) {
                res.status(500).json({ message: `Error al añadir el cliente a la base de datos: ${err}`, success: false });
            }
        });
    }
    GetAll(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientArray = yield this.CollectionModel.find({});
                res.status(200).json({ message: clientArray, success: true });
            }
            catch (err) {
                res.status(500).json({ message: `Error al buscar los clientes: ${err}`, success: false });
            }
        });
    }
    Get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clientAttr = req.params.id;
                const clients = yield this.CollectionModel.find({
                    $or: [{ 'nombre': { $regex: clientAttr, $options: "i" } }, { 'nif': { $regex: clientAttr, $options: "i" } }]
                }).exec();
                res.status(200).json({ message: clients, success: true });
            }
            catch (err) {
                res.status(500).json({ message: `Error al buscar los clientes: ${err}`, success: false });
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
            const clientID = req.params.id;
            try {
                const clientDeleted = yield this.CollectionModel.deleteOne({ _id: clientID });
                if (clientDeleted.deletedCount > 0) {
                    res.status(200).json({ message: `El cliente ${clientID} ha sido borrado correctamente de la base de datos`, success: true });
                    return;
                }
                res.status(200).json({ message: `Error al borrar ${clientID} de la base de datos: el cliente no existe`, success: false });
            }
            catch (err) {
                res.status(500).json({ message: `Error al borrar ${clientID} de la base de datos: ${err}`, success: false });
            }
        });
    }
    Update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientToUpdate = req.params.id;
            try {
                const clientJSON = req.body;
                const clientUpdated = yield this.CollectionModel.updateOne({ _id: clientToUpdate }, {
                    nif: clientJSON.nif,
                    nombre: clientJSON.nombre,
                    calle: clientJSON.calle,
                    cp: clientJSON.cp,
                });
                if (clientUpdated.modifiedCount > 0) {
                    res.status(200).json({ message: `El cliente ${clientJSON.nombre} ha sido actualizada correctamente`, success: true });
                    return;
                }
                res.status(200).json({ message: `Error al actualizar ${clientJSON.nombre} en la base de datos: el cliente no existe`, success: false });
            }
            catch (err) {
                res.status(500).json({ message: `Error al actualizar ${clientToUpdate} en la base de datos: ${err}`, success: false });
            }
        });
    }
}
exports.ClientDBController = ClientDBController;
