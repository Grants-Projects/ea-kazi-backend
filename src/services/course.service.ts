/** @format */

import { CourseRepository } from '../repository/course.repository';
import { injectable } from 'tsyringe';
import { Course } from '../models';
import { IRequest } from '../common/http.interface';
import StateConstants from '../lib/state-constants';
import StatusConstants from '../lib/status-constants';
import { BadRequest } from '../utils/errors/ErrorHandlers';

@injectable()
export class CourseService {
  constructor(private courseRepository: CourseRepository) {}

  getAllCourses = async (query): Promise<Course[]> => {
    return await this.courseRepository.getAllCourses(query);
  };

  createCourse = async (req: IRequest): Promise<Course> => {
    let result = await Course.findOne({
      where: {
        title: req.body.title
      }
    })
    if(result)  throw new BadRequest({ data: null, message: 'Title already exists' });
    const course = req.body;
    course.state = StateConstants.DRAFT;
    course.status = StatusConstants.NEW;
    console.log("course", course)
    return await this.courseRepository.createCourse(course);
  };

  getCourseDetails = async (courseId) => {
    return await this.courseRepository.getCourseDetails(courseId);
  };

  getCourses = async (id): Promise<any> => {
    return await Course.find({
      where: {
        author_id: id
      }
    });
  };
}
