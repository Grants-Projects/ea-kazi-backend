/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../common/http.interface';
import { JobCategoryService } from '../services/job_category.service';

@injectable()
export class JobCategoryController {
  constructor(private jobCategory: JobCategoryService) {}
  createJobCategory = async (req: IRequest, res: IResponse) => {
    try {
      const category = await this.jobCategory.createJobCategory(req);
      return res.ok(category, 'Category created successfully');
    } catch (error) {
      return res.unproccessable(
        error,
        error.message || 'An error occured while creating Category'
      );
    }
  };

  getJobCategory = async (req: IRequest, res: IResponse) => {
    try {
      const category = await this.jobCategory.getJobCategory(req.query.category_id);

      return res.ok(category, 'Category(s) fetched successfully');
    } catch (error) {
      return res.serverError(
        error,
        error.message || 'An error occured while fetching category(s)'
      );
    }
  };
}
