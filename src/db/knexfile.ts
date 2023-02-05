import dotenv from 'dotenv';
import path from 'path';
import { Knex } from 'knex';

dotenv.config({path: "../../.env"});

export const development: Knex.Config = {
    client: 'pg',
    connection: {
        host: process.env.DEV_DB_HOST,
        user: process.env.DEV_DB_USER,
        password: process.env.DEV_DB_PASS,
        database: process.env.DEV_DB_NAME,
    },
    migrations: {
        directory: path.join(__dirname, '/migrations')
    },
    seeds: {
        directory: path.join(__dirname, '/seeds')
    }
};
