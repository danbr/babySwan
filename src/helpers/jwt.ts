import jwt, { VerifyErrors } from 'jsonwebtoken';
import { v4 } from 'uuid';
import dotenv from 'dotenv';
import { User } from '../interfaces/db';

dotenv.config();

const TOKEN_SECRET: any = process.env.TOKEN_SECRET;

export const signUser = (data: User) => {
    const token = jwt.sign({
        data, 
        exp: Date.now() + (1000 * 60 * 60 * 24),
        jwtid: v4()
    }, TOKEN_SECRET);

    return token;
};

export const verifyUser = (data: string, callback: Function) => {
    jwt.verify(data, TOKEN_SECRET, (err: VerifyErrors | null, res: any) => {
        if (err) return callback(err, false)
        else if (
            res?.exp < Date.now()
        ) {
            const err = {
                status: 403,
                message: 'Aunthenticatiom error, please login again'
            }

            return callback(err, false);
        }
        return callback(false, res);
    });
};