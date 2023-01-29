/** @format */

import { CourseRepository } from '../repository/course.repository';
import { injectable } from 'tsyringe';
import { Course, ApplyCourse } from '../models';
import { IRequest } from '../common/http.interface';
import StateConstants from '../lib/state-constants';
import StatusConstants from '../lib/status-constants';
import { BadRequest } from '../utils/errors/ErrorHandlers';

@injectable()
export class CourseService {
  constructor(private courseRepository: CourseRepository) {}

  getAllCourses = async (query): Promise<Course[]> => {
    //return await this.courseRepository.getAllCourses(query);
    const courses = await Course.createQueryBuilder('a')
      .leftJoin('a.author', 'author')
      .select([
        'a.id',
        'a.state',
        'a.status',
        'a.title',
        'a.description',
        'a.metadata',
        'a.published_by',
        'a.approved_by',
        'a.published_at',
        'a.approved_at',
        'a.created_at',
        'a.updated_at',
        'author.id',
        'author.email',
        'author.first_name',
        'author.last_name',
      ])
      .getMany();

    return courses;
  };

  createCourse = async (req: IRequest): Promise<Course> => {
    let result = await Course.findOne({
      where: {
        title: req.body.title,
      },
    });
    if (result)
      throw new BadRequest({ data: null, message: 'Title already exists' });
    const course = req.body;
    course.state = StateConstants.DRAFT;
    course.status = StatusConstants.NEW;
    console.log('course', course);
    return await this.courseRepository.createCourse(course);
  };

  getCourseDetails = async (courseId) => {
    //return await this.courseRepository.getCourseDetails(courseId);
    const course = await Course.createQueryBuilder('a')
      .leftJoin('a.author', 'author')
      .select([
        'a.id',
        'a.state',
        'a.status',
        'a.title',
        'a.description',
        'a.metadata',
        'a.published_by',
        'a.approved_by',
        'a.published_at',
        'a.approved_at',
        'a.created_at',
        'a.updated_at',
        'author.id',
        'author.email',
        'author.first_name',
        'author.last_name',
      ])
      .where('a.id= :id', {
        id: courseId,
      })
      .getOne();

    return course;
  };

  getCourses = async (id): Promise<any> => {
    // return await Course.find({
    //   where: {
    //     author_id: id,
    //   },
    // });
    const courses = await Course.createQueryBuilder('a')
      .leftJoin('a.author', 'author')
      .select([
        'a.id',
        'a.state',
        'a.status',
        'a.title',
        'a.description',
        'a.metadata',
        'a.published_by',
        'a.approved_by',
        'a.published_at',
        'a.approved_at',
        'a.created_at',
        'a.updated_at',
        'author.id',
        'author.email',
        'author.first_name',
        'author.last_name',
      ])
      .where('a.author_id= :author_id', {
        author_id: id,
      })
      .getMany();

    return courses;
  };

  applyCourse = async (courseId: string, userId: string) => {
    return await ApplyCourse.create({
      courseId,
      userId,
    }).save();
  };
}
