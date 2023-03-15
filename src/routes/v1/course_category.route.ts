import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { CourseCategoryController } from '../../controller/course_category.controller';
import authMiddleware from '../../middleware/auth.middleware';

const categoryController: CourseCategoryController = container.resolve(
  CourseCategoryController
);

router.post('/', authMiddleware(), categoryController.createCourseCategory);
router.get('/', categoryController.getCourseCategory);
export default router;
