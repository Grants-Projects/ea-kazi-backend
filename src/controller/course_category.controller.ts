/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../common/http.interface';
import { CourseCategoryService } from '../services/course_category.service';

@injectable()
export class CourseCategoryController {
  constructor(private courseCategory: CourseCategoryService) {}
  createCourseCategory = async (req: IRequest, res: IResponse) => {
    try {
      const category = await this.courseCategory.createCourseCategory(req);
      return res.ok(category, 'Category created successfully');
    } catch (error) {
      return res.unproccessable(
        error,
        error.message || 'An error occured while creating Category'
      );
    }
  };
}
