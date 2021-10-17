import mongoose, { Document } from 'mongoose';
import { Request, Response, ErrorRequestHandler } from 'express';

export default interface IDBController {
    CollectionModel : mongoose.Model<Document>;

    Add(req: Request, res: Response): Promise<void>; 
    Get(req: Request, res: Response) : Promise<void>;
    GetAll(res: Response): Promise<void>;
    Remove(req: Request, res: Response): Promise<void>;
    Update(req: Request, res: Response): Promise<void>;
}
   