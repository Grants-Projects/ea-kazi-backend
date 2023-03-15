/** @format */

import { injectable } from 'tsyringe';
import { CourseCategory } from '../models';
import { IRequest } from '../common/http.interface';

@injectable()
export class CourseCategoryService {
  createCourseCategory = async (req: IRequest): Promise<CourseCategory> => {
    const checkCategoryName = await CourseCategory.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (checkCategoryName) {
      throw new Error(`Category with ${req.body.name} already exist!`);
    }
    const createCategory = {
      name: req.body.name,
      description: req.body.description,
    };
    return await CourseCategory.create({ ...createCategory }).save();
  };

  getCourseCategory = async (
    category_id: any
  ): Promise<CourseCategory | CourseCategory[]> => {
    if (category_id) {
      return await CourseCategory.findOne({
        where: {
          id: category_id,
        },
      });
    }
    return await CourseCategory.find();
  };
}
