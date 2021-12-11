import mongoose from 'mongoose';
import { IProduct } from '../types/Producto';
import IDBController from './IDBController';
import { Request, Response } from 'express';

export class ProductoDBController implements IDBController {

	public CollectionModel: mongoose.Model<IProduct>;

	constructor(modelo: mongoose.Model<IProduct>) {
		this.CollectionModel = modelo
		//this.CollectionModel.watch().on('change', (change) => { console.log("Watch event emitido") })
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

	public async GetAll(res: Response): Promise<void> {
		try {
			const prodArray = await this.CollectionModel.find({});
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
	}
}
