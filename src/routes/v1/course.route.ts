import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { CourseController } from '../../controller/course.controller';
import authMiddleware from '../../middleware/auth.middleware';
import CourseEntityValidator from '../../validators/course-entity.validator';

const courseController: CourseController = container.resolve(CourseController);
const courseValidator: CourseEntityValidator =
  container.resolve(CourseEntityValidator);

router.get('/', courseController.getAllCourses);
router.post(
  '/',
  authMiddleware(),
  courseValidator.createCourseEntity,
  courseController.createCourse
);
router.get('/:courseId', authMiddleware(), courseController.getCourseDetails);
router.get(
  '/:courseId/applications',
  authMiddleware(),
  courseController.getCourseApplications
);
router.post('/apply', authMiddleware(), courseController.applyCourse);
router.put('/:courseId', authMiddleware(), courseController.editCourse);
export default router;
