import express, {Router } from "express";
const router:Router = express.Router();
import {container} from "tsyringe";
import { CourseController } from "../../controller/course.controller";
import authMiddleware from '../../middleware/auth.middleware';
const courseController: any = container.resolve(CourseController)

router.get('/', courseController.getAllCourses)
router.post('/', authMiddleware, courseController.createCourse);

export default router;