import 'reflect-metadata';
import {DataSourceOptions} from 'typeorm';
import { Ratings1659482279779 } from '../1659482279779-Ratings';
import {User1659482181387, Courses1659482205775,} from './migrations';
import { TrainerRating1659609648011 } from './migrations/1659609648011-TrainerRating';
import { CourseBatch1659610621656 } from './migrations/1659610621656-CourseBatch';
import { Enrollment1659611138194 } from './migrations/1659611138194-Enrollment';
import { TrainerDocument1659612597656 } from './migrations/1659612597656-Trainer_Document';
import { Certificate1659613196251 } from './migrations/1659613196251-Certificate';
import { UserRole1659613875302 } from './migrations/1659613875302-UserRole';
import { Role1659614035964 } from './migrations/1659614035964-Role';
import {User} from './models/users';

const isDev = process.env.NODE_ENV === 'development';

const connectionOpts: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_SERVER || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '12345678',
  database: process.env.DB_NAME || 'ea_kazi',
  entities: [User],
  synchronize: false,
  logging: isDev,
  migrationsRun: true,
   migrations: [
    User1659482181387,
    Courses1659482205775,
    TrainerRating1659609648011,
    CourseBatch1659610621656,
    Enrollment1659611138194,
    Ratings1659482279779,
    TrainerDocument1659612597656,
    Certificate1659613196251,
    Role1659614035964,
    UserRole1659613875302
   ]
};

export default connectionOpts;