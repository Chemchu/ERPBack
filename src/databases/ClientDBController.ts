import mongoose from 'mongoose';
import { IClient } from '../types/Cliente';
import { Request, Response } from 'express';
import { IDBState } from '../types/DBState';
import { v4 as uuidv4 } from 'uuid';

export class ClientDBController {

	public CollectionModel: mongoose.Model<IClient & IDBState>;

	constructor(modelo: mongoose.Model<IClient & IDBState>) {
		this.CollectionModel = modelo
	}
}
