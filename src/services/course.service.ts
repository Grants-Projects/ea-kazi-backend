/** @format */

import { CourseRepository } from '../repository/course.repository';
import { injectable } from 'tsyringe';
import { Course } from '../models';

@injectable()
export class CourseService {
	constructor(private courseRepository: CourseRepository) {}

	getAllCourses = async (): Promise<Course[]> => {
		return await this.courseRepository.getAllCourses();
	};
}
