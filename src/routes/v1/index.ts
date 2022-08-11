import express, { Router } from 'express';
import CourseRouter from './course.route';
import AuthRouter from './auth.route';

const AppRouter: Router = express.Router();

AppRouter.use('/auth', AuthRouter);
AppRouter.use('/courses', CourseRouter);

export default AppRouter;
