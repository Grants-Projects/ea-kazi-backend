import express, { Router } from 'express';
import UserRouter from './UserRoute';
import CourseRouter from './CourseRoute';

const AppRouter: Router = express.Router();

AppRouter.use('/user', UserRouter);
AppRouter.use('/courses', CourseRouter);

export default AppRouter;
