require('dotenv').config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Ratings1659611912439 } from '../migrations/1659611912439-Ratings';
import { TrainerRating1659609648011 } from '../migrations/1659609648011-TrainerRating';
import { CourseBatch1659610621656 } from '../migrations/1659610621656-CourseBatch';
import { TrainerDocument1659612597656 } from '../migrations/1659612597656-Trainer_Document';
import { Certificate1659613196251 } from '../migrations/1659613196251-Certificate';
import { Role1659653069162 } from '../migrations/1659653069162-Role';
import { UserRole1659653120395 } from '../migrations/1659653120395-UserRole';
import { User1659482181387 } from '../migrations/1659482181387-User';
import { Courses1659482205775 } from '../migrations/1659482205775-Courses';
import { Enrollment1659611138194 } from '../migrations/1659611138194-Enrollment';
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
  // migrations: ['src/migrations/**/*{.ts,.js}'],
  migrations: [
    User1659482181387,
    Courses1659482205775,
    TrainerRating1659609648011,
    CourseBatch1659610621656,
    Enrollment1659611138194,
    Ratings1659611912439,
    TrainerDocument1659612597656,
    Certificate1659613196251,
    Role1659653069162,
    UserRole1659653120395
   ]
  // subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
