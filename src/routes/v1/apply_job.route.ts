import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { ApplyJobController } from '../../controller/apply_job.controller';
import authMiddleware from '../../middleware/auth.middleware';
import ApplyJobEntityValidator from '../../validators/apply_job-entity.validator';

const applyJobController: ApplyJobController = container.resolve(ApplyJobController);
const applyJobValidator: ApplyJobEntityValidator = container.resolve(ApplyJobEntityValidator);

router.post(
  '/',
  authMiddleware(),
  applyJobValidator.createJobEntity,
  applyJobController.createJobApplication
);

router.get(
  '/freelancers/:jobId',
  authMiddleware(),
  applyJobController.getFreelancersOnAJob
);

export default router;
