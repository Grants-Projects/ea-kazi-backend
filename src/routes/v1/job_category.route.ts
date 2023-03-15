import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { JobCategoryController } from '../../controller/job_category.controller';
import authMiddleware from '../../middleware/auth.middleware';

const categoryController: JobCategoryController =
  container.resolve(JobCategoryController);

router.post('/', authMiddleware(), categoryController.createJobCategory);
export default router;
