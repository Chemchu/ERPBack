import mongoose from 'mongoose';
import { IProduct } from '../types/Producto';
import IDBController from './IDBController';
import { Request, Response } from 'express';
import { IDBState } from '../types/DBState';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductList } from '../lib/productCreator';
import { ProcessCSV } from '../lib/processCSV';
export class ProductoDBController implements IDBController {

	public CollectionModel: mongoose.Model<IProduct & IDBState>;

	constructor(modelo: mongoose.Model<IProduct & IDBState>) {
		this.CollectionModel = modelo
	}

	public async Add(req: Request, res: Response): Promise<void> {
		try {
			// El producto en JSON de la petición
			const prodJSON = req.body;

			// Crea el producto
			const productoToAdd: mongoose.Document<IProduct> = new this.CollectionModel({
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

			const yaExisteProducto = await this.CollectionModel.exists({ nombre: prodName });
			if (yaExisteProducto) { res.status(200).json({ message: `Error al añadir ${prodJSON.nombre} en la base de datos: nombre en uso`, success: false }); return; }

			const yaExisteEAN = await this.CollectionModel.exists({ ean: prodEAN });
			if (yaExisteEAN) { res.status(200).json({ message: `Error al añadir ${prodJSON.nombre} en la base de datos: EAN en uso`, success: false }); return; }

			await productoToAdd.save();
			res.status(200).json({ message: `El producto ${prodName} ha sido añadido en la base de datos`, success: true });
		}
		catch (err) {
			console.log(err);
			res.status(500).json({ message: `Error al añadir el producto en la base de datos`, success: false });
		}
	}

	public async AddMany(req: Request, res: Response): Promise<void> {
		try {
			// El producto en JSON de la petición
			const pArray = ProcessCSV(req.body.csv);

			const auxProductList: IProduct[] = CreateProductList(pArray);
			let prodList: IProduct[] = [];

			for (var i = 0; i < auxProductList.length; i++) {
				const prodName = auxProductList[i].nombre;
				const prodEAN = auxProductList[i].ean;
				const prodRepetidoEnCSV = prodList.some(p => p.nombre === auxProductList[i].nombre || p.ean === auxProductList[i].ean);

				const yaExisteProducto = await this.CollectionModel.exists({ nombre: prodName });
				if (yaExisteProducto || prodRepetidoEnCSV) { continue; }

				const yaExisteEAN = await this.CollectionModel.exists({ ean: prodEAN });
				if (yaExisteEAN) { continue; }

				prodList.push(auxProductList[i]);
			}

			// Solo se añaden productos no existentes
			await this.CollectionModel.insertMany(prodList);

			res.status(200).json({ message: `Los productos han sido añadidos en la base de datos`, success: true });
		}
		catch (err) {
			console.log(err);
			res.status(500).json({ message: `Error al añadir los productos en la base de datos`, success: false });
		}
	}

	public async GetAll(res: Response): Promise<void> {
		try {
			const prodArray = await this.CollectionModel.find({ databaseState: { "$exists": false } });
			res.status(200).json({ message: prodArray, success: true });
		}
		catch (err) {
			res.status(500).json({ message: `Error al buscar los productos: ${err}`, success: false });
		}
	}

	public async Get(req: Request, res: Response): Promise<void> {
		try {
			const prodAttr = req.params.id;
			const products = await this.CollectionModel.find(
				{
					$or: [{ 'nombre': { $regex: prodAttr, $options: "i" } }, { 'familia': { $regex: prodAttr, $options: "i" } }, { 'EAN': { $regex: prodAttr, $options: "i" } }]
				}
			).exec();

			res.status(200).json({ message: products, success: true });
		}
		catch (err) {
			res.status(500).json({ message: `Error al buscar los productos: ${err}`, success: false });
		}
	}

	public async GetDBState(req: Request, res: Response): Promise<void> {
		try {
			const dbState = await this.CollectionModel.find({}).select({ 'databaseState': 1 }).lean();

			console.log("dbState");


			for (var i = 0; i < dbState.length; i++) {
				if (dbState[i].databaseState) {
					res.status(200).json({ message: dbState[i], success: true });
					return;
				}
			}

			const stateUid = uuidv4();
			const databaseStateToAdd = new this.CollectionModel({
				databaseState: stateUid
			});

			await databaseStateToAdd.save();

			res.status(300).json({ message: 'El databaseState no se encuentra en la base de datos. Uno nuevo ha sido creado', success: false });
		}
		catch (err) {
			res.status(500).json({ message: `Error al buscar el databaseState: ${err}`, success: false });
		}
	}

	// TODO
	public async Remove(req: Request, res: Response): Promise<void> {
		const productName = req.params.id;
		try {
			const productDeleted = await this.CollectionModel.deleteOne({ nombre: productName });
			if (productDeleted.deletedCount > 0) {
				res.status(200).json({ message: `El producto ${productName} ha sido borrado correctamente de la base de datos`, success: true });
				return;
			}
			res.status(200).json({ message: `Error al borrar ${productName} de la base de datos: el producto no existe`, success: false });
		}
		catch (err) {
			res.status(500).json({ message: `Error al borrar ${productName} de la base de datos: ${err}`, success: false });
		}
	}

	// TODO
	public async Update(req: Request, res: Response): Promise<void> {
		const productoToUpdateId = req.params.id;
		try {
			const prodJSON = req.body;
			const productUpdated = await this.CollectionModel.updateOne({ _id: productoToUpdateId }, {
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
				img: prodJSON.img
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
	}
}
