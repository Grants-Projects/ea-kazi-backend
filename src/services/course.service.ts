/** @format */

import { CourseRepository } from '../repository/course.repository';
import { injectable } from 'tsyringe';
import { Course } from '../models';
import { IRequest, IResponse } from '../common/http.interface';

@injectable()
export class CourseService {
	constructor(private courseRepository: CourseRepository) {}

	getAllCourses = async (): Promise<Course[]> => {
		console.log('hehee');
		return await this.courseRepository.getAllCourses();
	};

	createCourse = async (req: IRequest, res: IResponse): Promise<Course> => {
		return await this.courseRepository.createCourse(req.body);
	};
}
