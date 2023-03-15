import express, { Router } from 'express';
import CourseRouter from './course.route';
import AuthRouter from './auth.route';
import CertificateRouter from './certificate.route';
import JobRouter from './job.route';
import SkillRouter from './skills.route';
import UserRouter from './user.route';
import ApplyJobRouter from './apply_job.route';
import MeRouter from './me.route';
import RecruiterRoute from './recruiter.route';
import CourseCategoryRoute from './course_category.route';
import JobCategoryRoute from './job_category.route';

const AppRouter: Router = express.Router();

AppRouter.use('/auth', AuthRouter);
AppRouter.use('/courses', CourseRouter);
AppRouter.use('/certificates', CertificateRouter);
AppRouter.use('/jobs', JobRouter);
AppRouter.use('/skills', SkillRouter);
AppRouter.use('/user', UserRouter);
AppRouter.use('/apply-job', ApplyJobRouter);
AppRouter.use('/me', MeRouter);
AppRouter.use('/recruiter', RecruiterRoute);
AppRouter.use('/category/course', CourseCategoryRoute);
AppRouter.use('/category/job', JobCategoryRoute);

export default AppRouter;
