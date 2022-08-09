/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../common/http.interface';
import { CourseService } from '../services/course.service';

@injectable()
export class CourseController {
	constructor(private courseService: CourseService) {}

	getAllCourses = async (req: IRequest, res: IResponse) => {
		try {
			const courses = await this.courseService.getAllCourses();

			return res.ok(courses, 'Courses fetched successfully');
		} catch (error) {
			return res.forbidden(
				error,
				error.message || 'An error occured while fetching courses'
			);
		}
	};
}
