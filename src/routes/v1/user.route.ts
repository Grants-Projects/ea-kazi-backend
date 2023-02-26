import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { CourseController } from '../../controller/course.controller';
import { JobController } from '../../controller/job.controller';
import { UserController } from '../../controller/user.controller';
import authMiddleware from '../../middleware/auth.middleware';

const jobController: JobController = container.resolve(JobController);
const courseController: CourseController = container.resolve(CourseController);

const userController: any = container.resolve(UserController);
router.get('/', authMiddleware(), userController.getUserProfile);
router.get('/:userId', authMiddleware(), userController.getUserDetails);
router.get('/jobs/created', authMiddleware(), jobController.recruiterJobList);
router.get('/jobs/applied', authMiddleware(), jobController.getAppliedJobs);
router.get('/courses/applied', authMiddleware(), courseController.getAppliedCourses);

export default router;
