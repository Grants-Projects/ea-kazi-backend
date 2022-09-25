import express, { Router } from 'express';
import CourseRouter from './course.route';
import AuthRouter from './auth.route';
import CertificateRouter from './certificate.route';
import JobRouter from './job.route';
import SkillRouter from './skills.route';

const AppRouter: Router = express.Router();

AppRouter.use('/auth', AuthRouter);
AppRouter.use('/courses', CourseRouter);
AppRouter.use('/certificates', CertificateRouter);
AppRouter.use('/jobs', JobRouter);
AppRouter.use('/skills', SkillRouter);
export default AppRouter;
