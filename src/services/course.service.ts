/** @format */

import { CourseRepository } from '../repository/course.repository';
import { injectable } from 'tsyringe';
import { Course } from '../models';
import { IRequest } from '../common/http.interface';
import StateConstants from '../lib/state-constants';
import StatusConstants from '../lib/status-constants';

@injectable()
export class CourseService {
  constructor(private courseRepository: CourseRepository) {}

  getAllCourses = async (query): Promise<Course[]> => {
    return await this.courseRepository.getAllCourses(query);
  };

  createCourse = async (req: IRequest): Promise<Course> => {
    const course = req.body;
    course.state = StateConstants.DRAFT;
    course.status = StatusConstants.NEW;
    return await this.courseRepository.createCourse(course);
  };

  getCourseDetails = async (courseId) => {
    return await this.courseRepository.getCourseDetails(courseId);
  };
}
