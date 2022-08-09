/** @format */

import { injectable } from 'tsyringe';
import { Course } from '../models';
import { AppDataSource } from '../utils/data-source';

const courseRepository = AppDataSource.getRepository(Course);

@injectable()
export class CourseRepository {
	getAllCourses = async (): Promise<Course[]> => {
		return await courseRepository.find();
	};

	createCourse = async (input: Partial<Course>) => {
		return await courseRepository.save(courseRepository.create(input));
	};
}
