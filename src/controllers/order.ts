import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';

import knex from '../db';
dotenv.config();

//Create a recurring order
export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
}

//Get user's recurring order
export const order = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
}

//Edit recurring order
export const editOrder = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
}

//Delete recurring order
export const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
}
