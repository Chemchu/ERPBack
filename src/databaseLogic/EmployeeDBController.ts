import mongoose from 'mongoose';
import { IEmployee } from '../types/Empleado';
import IDBController from './IDBController';
import { Request, Response } from 'express';

export class EmployeeDBController implements IDBController {

    public CollectionModel: mongoose.Model<IEmployee>;

    constructor(modelo: mongoose.Model<IEmployee>) {
        this.CollectionModel = modelo
    }

    // TODO
    public async Add(req: Request, res: Response): Promise<Response> {
		return res;
	}

	// TODO
	public async GetAll(res: Response): Promise<Response> {
		return res;
	}

	// TODO
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
