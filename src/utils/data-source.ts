require('dotenv').config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../models';

// const mysqlConfig = configuration.get<{
//   host: string;
//   port: number;
//   username: string;
//   password: string;
//   database: string;
// }>('mysqlConfig');

export const AppDataSource = new DataSource({
    host: process.env.DB_SERVER || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '12345678',
    database: process.env.DB_NAME || 'ea_kazi',
    synchronize: false,
    migrationsRun: true,
    type: 'mysql',
    logging: false,
    entities: [User],
    migrations: ['src/database/migrations/*{.ts,.js}'],
    // subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
