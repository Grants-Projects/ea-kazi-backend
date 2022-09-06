/** @format */

import { injectable } from 'tsyringe';
import { Course } from '../models';
import { AppDataSource } from '../utils/data-source';

const courseRepository = AppDataSource.getRepository(Course);

@injectable()
export class CourseRepository {
  getAllCourses = async (query): Promise<Course[]> => {
    return await courseRepository.find({
      where: {
        state: query?.state,
        status: query?.status,
      },
    });
  };

  createCourse = async (course: Partial<Course>) => {
    return await courseRepository.save(courseRepository.create(course));
  };

  getCourseDetails = async (courseId) => {
    return await courseRepository.find({
      where: {
        id: courseId,
      },
    });
  };
}
