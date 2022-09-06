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
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT) || 3306,
    username: process.env.MYSQL_USER || 'marvelous',
    password: process.env.MYSQL_PASSWORD || 'marvelous',
    database: process.env.MYSQL_DATABASE || 'ea-kazi',
    synchronize: false,
    migrationsRun: true,
    type: 'mysql',
    logging: false,
    entities: [User],
    migrations: ['src/database/migrations/*{.ts,.js}'],
    // subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
