/** @format */

import { injectable } from 'tsyringe';
import { Course } from '../models';
import { AppDataSource } from '../utils/data-source';

const courseRepository = AppDataSource.getRepository(Course);

@injectable()
export class CourseRepository {
	getAllCourses = async (query): Promise<Course[]> => {
		if (
			query &&
			Object.keys(query).length &&
			(query.published === 'true' || query.published === 'false')
		) {
			let condition = query.published;
			condition === 'true' ? (condition = true) : (condition = false);
			return await courseRepository.find({
				where: {
					is_published: condition,
				},
			});
		}

		return await courseRepository.find();
	};

	createCourse = async (course: Partial<Course>) => {
		return await courseRepository.save(courseRepository.create(course));
	};
}
