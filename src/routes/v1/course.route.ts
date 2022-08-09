import express, {Router } from "express";
const router:Router = express.Router();
import {container} from "tsyringe";
import { CourseController } from "../../controller/CourseController";
const courseController: any = container.resolve(CourseController)

router.post('/', courseController.getAllCourses)

export default router;