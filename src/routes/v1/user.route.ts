import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { JobController } from '../../controller/job.controller';
import { UserController } from '../../controller/user.controller';
import authMiddleware from '../../middleware/auth.middleware';

const jobController: JobController = container.resolve(JobController);

const userController: any = container.resolve(UserController);
router.get('/', authMiddleware(), userController.getUserProfile);
router.get('/:userId', authMiddleware(), userController.getUserDetails);
router.get('/job/applications', authMiddleware(), jobController.recruiterJobList);

export default router;
