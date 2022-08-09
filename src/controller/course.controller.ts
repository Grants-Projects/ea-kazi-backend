/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../common/http.interface';
import { CourseService } from '../services/course.service';

@injectable()
export class CourseController {
	constructor(private courseService: CourseService) {}

	getAllCourses = async (req: IRequest, res: IResponse) => {
		try {
			const courses = await this.courseService.getAllCourses(req.query);

			return res.ok(courses, 'Courses fetched successfully');
		} catch (error) {
			return res.serverError(
				error,
				error.message || 'An error occured while fetching courses'
			);
		}
	};

	createCourse = async (req: IRequest, res: IResponse) => {
		try {
			const course = await this.courseService.createCourse(req, res);
			return res.ok(course, 'Course created successfully');
		} catch (error) {
			return res.serverError(
				error,
				error.message || 'An error occured while creating course'
			);
		}
	};
}
