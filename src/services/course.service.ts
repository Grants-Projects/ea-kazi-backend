/** @format */

import { CourseRepository } from '../repository/course.repository';
import { injectable } from 'tsyringe';
import { Course, ApplyCourse } from '../models';
import { IRequest } from '../common/http.interface';
import StateConstants from '../lib/state-constants';
import StatusConstants from '../lib/status-constants';
import { BadRequest, ResourceNotFoundError } from '../utils/errors/ErrorHandlers';

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

  getAppliedCourses = async (userId: string) => {
    return await ApplyCourse.createQueryBuilder('a')
      .leftJoin('a.user', 'user')
      .leftJoin('a.course', 'course')
      .leftJoin('course.author', 'author')
      .select([
        'a.id',
        'a.userId',
        'a.status',
        'a.createdAt',
        'user.id',
        'user.email',
        'user.first_name',
        'user.last_name',
        'course.id',
        'course.author_id',
        'course.state',
        'course.status',
        'course.title',
        'course.image',
        'course.description',
        'course.metadata',
        'course.published_by',
        'course.approved_by',
        'course.created_at',
        'course.author',
        'author.id',
        'author.email',
        'author.first_name',
        'author.last_name',
      ])
      .where('a.userId= :userId', {
        userId,
      })
      .getMany();
  };

  editCourse = async (data: any, courseId: string) => {
    const user_id = data.user.userId;
    delete data.user;
    console.log('data', user_id);
    const courseToUpdate = await Course.findOne({
      where: {
        id: courseId,
        author_id: user_id,
      },
    });
    if (!courseToUpdate) {
      throw new ResourceNotFoundError({
        data: null,
        message:
          'Course not found. You may want to be sure that you created this course',
      });
    }
    if (
      courseToUpdate.status == 'PUBLISHED' ||
      courseToUpdate.status == 'EXPIRED' ||
      courseToUpdate.status === 'COMPLETED'
    ) {
      throw new BadRequest({
        data: null,
        message:
          'Course cannot be updated - either it has expired, published or completed',
      });
    }

    courseToUpdate.title = data.title;
    courseToUpdate.image = data.image;
    courseToUpdate.description = data.description;
    courseToUpdate.status = data.status;
    courseToUpdate.state = data.state;
    await Course.save(courseToUpdate);
    return courseToUpdate;
  };

  getCourseApplications = async (course: any): Promise<ApplyCourse[]> => {
    const courseApplied = await Course.findOne({
      where: {
        id: course.courseId,
      },
    });

    if (!courseApplied) {
      throw new Error('Course does not exist.!');
    }

    const users = await ApplyCourse.createQueryBuilder('a')
      .leftJoin('a.user', 'user')
      .select([
        'a.id',
        'a.course_id',
        'user.id',
        'user.email',
        'user.first_name',
        'user.last_name',
        'a.status',
        'a.created_at',
        'a.updated_at',
      ])
      .where('a.course_id = :course', {
        course: course.courseId,
      })
      .getMany();
    return users;
  };
}
