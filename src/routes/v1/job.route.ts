import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { JobController } from '../../controller/job.controller';
import authMiddleware from '../../middleware/auth.middleware';
import JobEntityValidator from '../../validators/job-entity.validator';

const jobController: any = container.resolve(JobController);
const jobValidator: any = container.resolve(JobEntityValidator);

router.get('/', authMiddleware(), jobController.getAllJobs);
router.post(
  '/',
  authMiddleware,
  jobValidator.createJobEntity,
  jobController.createJob
);
router.get('/:jobId', authMiddleware(), jobController.getJobDetails);
export default router;
