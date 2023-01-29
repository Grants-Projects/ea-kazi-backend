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
      req.body.author_id = req.body.user.userId;
      const course = await this.courseService.createCourse(req);
      return res.ok(course, 'Course created successfully');
    } catch (error) {
      return res.serverError(
        error,
        error.message || 'An error occured while creating course'
      );
    }
  };

  getCourseDetails = async (req: IRequest, res: IResponse) => {
    try {
      const course = await this.courseService.getCourseDetails(req.params.courseId);
      return res.ok(course, 'Course fetched successfully');
    } catch (error) {
      return res.serverError(
        error,
        error.message || 'An error occured while fetching course details'
      );
    }
  };

  getCourses = async (req: IRequest, res: IResponse) => {
    try {
      const course = await this.courseService.getCourses(req.body.user.userId);
      return res.ok(course, 'Course fetched successfully');
    } catch (error) {
      return res.serverError(
        error,
        error.message || 'An error occured while fetching course details'
      );
    }
  };
  applyCourse = async (req: IRequest, res: IResponse) => {
    try {
      const apply = await this.courseService.applyCourse(
        req.body.course_id,
        req.body.user.userId
      );
      return res.ok(apply, 'Course applied successfully');
    } catch (error) {
      return res.serverError(
        error,
        error.message || 'An error occured while fetching course details'
      );
    }
  };
}
