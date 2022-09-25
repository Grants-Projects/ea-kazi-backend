require('dotenv').config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
  User,
  Certificate,
  Course,
  TrainerRatings,
  Job,
  Role,
  UserRole,
  Skills,
  JobSkillCategory,
} from '../models';
import {
  User1659482181387,
  Courses1659482205775,
  TrainerRating1659609648011,
  CourseBatch1659610621656,
  Enrollment1659611138194,
  Ratings1659874533710,
  TrainerDocument1659612597656,
  Certificate1659613196251,
  Role1659653069162,
  UserRole1659873881050,
  skillCategory1659976258492,
  courseSkillCategory1659976635656,
  job1659977064328,
  jobSkillCategory1659977206217,
  statusStateMapping1660212541650,
  AddRole1660219541657,
} from '../database/migrations';

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
  database: process.env.MYSQL_DATABASE || '',
  synchronize: false,
  migrationsRun: true,
  type: 'mysql',
  logging: false,
  entities: [
    User,
    Certificate,
    Course,
    TrainerRatings,
    Job,
    Role,
    UserRole,
    Skills,
    JobSkillCategory,
  ],
  migrations: [
    User1659482181387,
    Courses1659482205775,
    TrainerRating1659609648011,
    CourseBatch1659610621656,
    Enrollment1659611138194,
    Ratings1659874533710,
    TrainerDocument1659612597656,
    Certificate1659613196251,
    Role1659653069162,
    UserRole1659873881050,
    skillCategory1659976258492,
    courseSkillCategory1659976635656,
    job1659977064328,
    jobSkillCategory1659977206217,
    statusStateMapping1660212541650,
    AddRole1660219541657,
  ],
  // subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
