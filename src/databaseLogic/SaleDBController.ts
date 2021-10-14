import mongoose from 'mongoose';
import { ISale } from '../types/Venta';
import IDBController from './IDBController';
import { Request, Response } from 'express';

export class SaleDBController implements IDBController {

    public CollectionModel: mongoose.Model<ISale>;

    constructor(modelo: mongoose.Model<ISale>) {
        this.CollectionModel = modelo
    }

    public async Add(req: Request, res: Response): Promise<Response> {
		return res;
	}

	public async GetAll(res: Response): Promise<Response> {
		return res;
	}

	public async Get(req: Request, res: Response): Promise<Response> {		
		return res;
	}

	// TODO
	public async Remove(req: Request, res: Response): Promise<Response> {
		return res;
	}

	// TODO
	public async Update(req: Request, res: Response): Promise<Response> {
		return res;
	}
}
