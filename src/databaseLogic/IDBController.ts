import mongoose, { Document } from 'mongoose';
import { Request, Response, ErrorRequestHandler } from 'express';

export default interface IDBController {
    CollectionModel : mongoose.Model<Document>;

    Add(req: Request, res: Response): Promise<Response>; 
    Get(req: Request, res: Response) : Promise<Response>;
    GetAll(res: Response): Promise<Response>;
    Remove(req: Request, res: Response): Promise<Response>;
    Update(req: Request, res: Response): Promise<Response>;
}
   