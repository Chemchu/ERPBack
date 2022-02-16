import mongoose from 'mongoose';
import IDBController from './IDBController';
import { Request, Response } from 'express';
import { ICierreTPV } from '../types/TPV';

export class CierreTPVDBController implements IDBController {

    public CollectionModel: mongoose.Model<ICierreTPV>;

    constructor(modelo: mongoose.Model<ICierreTPV>) {
        this.CollectionModel = modelo
    }

    public async Add(req: Request, res: Response): Promise<void> {
    }

    public async GetAll(res: Response): Promise<void> {
    }

    public async Get(req: Request, res: Response): Promise<void> {
    }

    public async GetDBState(req: Request, res: Response): Promise<void> {
    }

    public async Remove(req: Request, res: Response): Promise<void> {
    }

    public async Update(req: Request, res: Response): Promise<void> {
    }
}
