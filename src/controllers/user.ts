import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';

import knex from '../db';
import { User, UserAddress, UserBalance } from '../interfaces/db';
import { responseSuccess, responseErrorValidation, responseError } from '../helpers';
import { hashPassword, verifyPassword } from '../helpers/password';
import rpcClient from '../btc/rpcClient';
import { addressType } from '../interfaces/addresses';
import { signUser } from '../helpers/jwt';
import { RequestUser } from '../interfaces';
dotenv.config();

const walletname = process.env.WALLET_NAME ? process.env.WALLET_NAME : 'wallet.dat';

// Register a new user
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const username = req.body.username;
        const pass = req.body.password;

        // Check if username already exists in the database
        const user: User[] = await knex<User>('users').where({ username });
        if (user.length > 0) {
            return responseError(res, 400, 'Username already exists');
        }

        const password = hashPassword(pass);
        const userId = await knex<User>('users').insert({ username, password }).returning('id');
    
        const { data } = await rpcClient.getNewAddress('useraddress', addressType.bech32, walletname);
        const address = data.result;

        if (userId.length > 0) {
            // Create user address, add address to addresslogs and create user balance of default 0
            const id = userId[0].id;
            await knex<UserAddress>('useraddresses').insert({ userId: id, receiveAddress: address });
            await knex<UserAddress>('addresslogs').insert({ userId: id, receiveAddress: address });
            await knex<UserBalance>('usersbalance').insert({ userId: id, amount: 0 });
        }

        responseSuccess(res, 200, 'Successfully created user', {});
    } catch (err) {
        next(err);
    }
};

// User login
export const userLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const username: string = req.body.username;
        const pass: string = req.body.password;

        const users: User[] = await knex<User>('users').where({ username });

        if (users.length > 0) {
            let user = users[0];
            if (!verifyPassword(pass, user.password)) {
                return responseError(res, 404, 'Incorrect password');
            }

            // delete user password
            delete user.password;

            const token = signUser(user);
            user.jwtoken = token;

            return responseSuccess(res, 200, 'Successfully login', user);
        } else {
            return responseError(res, 404, 'Not a valid user');
        }
    } catch (err) {
        next(err);
    }
};

// Get user address
export const userAddress = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const reqUser = req as RequestUser;
        const userId = reqUser.user.id;

        const userAddress: UserAddress[] = await knex<UserAddress>('useraddresses').where({ userId: userId});

        return responseSuccess(res, 200, 'Successfully return user address', userAddress[0].receiveAddress);
       
    } catch (err) {
        next(err);
    }
};

// Get user balance
export const userBalance = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return responseErrorValidation(res, 400, errors.array());
        }

        const reqUser = req as RequestUser;
        const userId = reqUser.user.id;

        const userBalance: UserBalance[] = await knex<UserBalance>('usersbalance').where({ userId: userId});

        return responseSuccess(res, 200, 'Successfully return user balance', userBalance[0].amount);
       
    } catch (err) {
        next(err);
    }
};