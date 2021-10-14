import mongoose from 'mongoose';
import { IClient } from '../types/Cliente';
import IDBController from './IDBController';
import { Request, Response } from 'express';

export class ClientDBController implements IDBController {

    public CollectionModel: mongoose.Model<IClient>;

    constructor(modelo: mongoose.Model<IClient>) {
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
