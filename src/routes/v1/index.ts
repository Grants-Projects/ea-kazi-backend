import express, { Router } from 'express';
import CourseRouter from './course.route';
import AuthRouter from './auth.route';
import CertificateRouter from './certificate.route';

const AppRouter: Router = express.Router();

AppRouter.use('/auth', AuthRouter);
AppRouter.use('/courses', CourseRouter);
AppRouter.use('/certificates', CertificateRouter);

export default AppRouter;
