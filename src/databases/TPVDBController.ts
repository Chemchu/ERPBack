import mongoose from 'mongoose';
import IDBController from './IDBController';
import { Request, Response } from 'express';
import { ITPV } from '../types/TPV';

export class TPVDBController {

    public CollectionModel: mongoose.Model<ITPV>;

    constructor(modelo: mongoose.Model<ITPV>) {
        this.CollectionModel = modelo
    }

    public async Add(req: Request, res: Response): Promise<void> {

    }

    public async GetAll(res: Response): Promise<void> {
    }

    public async Get(req: Request, res: Response): Promise<void> {
    }

    public async Remove(req: Request, res: Response): Promise<void> {
    }

    public async Update(req: Request, res: Response): Promise<void> {
    }
}
