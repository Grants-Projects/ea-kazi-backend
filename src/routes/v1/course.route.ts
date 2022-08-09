import express, {Router } from "express";
const router:Router = express.Router();
import {container} from "tsyringe";
import { CourseController } from "../../controller/course.controller";
const courseController: any = container.resolve(CourseController)

router.get('/', courseController.getAllCourses)

export default router;