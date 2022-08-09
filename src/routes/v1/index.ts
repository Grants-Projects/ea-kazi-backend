import express, { Router } from 'express';
import CourseRouter from './course.route';
import UserRouter from './user.route';

const AppRouter: Router = express.Router();

AppRouter.use('/user', UserRouter);
AppRouter.use('/courses', CourseRouter);

export default AppRouter;
