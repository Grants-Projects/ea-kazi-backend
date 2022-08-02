import 'reflect-metadata';
import {DataSourceOptions} from 'typeorm';
import {Users} from "./models"
import {TrainerDocument1659482165404, User1659482181387, Courses1659482205775, CourseBatch1659482223141, Enrollment1659482240211} from './migrations';

const isDev = process.env.NODE_ENV === 'development';

const connectionOpts: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_SERVER || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'marvelous',
  password: process.env.DB_PASS || 'marvelous',
  database: process.env.DB_NAME || 'auth',
  entities: [Users],
  synchronize: false,
  logging: isDev,
  migrationsRun: true,
   migrations: [
    TrainerDocument1659482165404,
    User1659482181387,
    Courses1659482205775,
    CourseBatch1659482223141,
    Enrollment1659482240211
   ]
};

export default connectionOpts;