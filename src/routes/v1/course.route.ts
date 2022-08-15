import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { CourseController } from '../../controller/course.controller';
import authMiddleware from '../../middleware/auth.middleware';
import CourseEntityValidator from '../../validators/course-entity.validator';


const courseController: any = container.resolve(CourseController);
const courseValidator: any = container.resolve(CourseEntityValidator);

router.get('/', courseController.getAllCourses);
router.post(
	'/',
	authMiddleware,
	courseValidator.createCourseEntity,
	courseController.createCourse
);
router.get('/:courseId', authMiddleware, courseController.getCourseDetails)
export default router;
