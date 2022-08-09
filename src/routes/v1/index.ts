import express, { Router } from 'express';
import CourseRouter from './course.route';
import UserRouter from './user.route';
import CertificateRouter from './certificate.route';

const AppRouter: Router = express.Router();

AppRouter.use('/user', UserRouter);
AppRouter.use('/courses', CourseRouter);
AppRouter.use('/certificates', CertificateRouter);

export default AppRouter;
