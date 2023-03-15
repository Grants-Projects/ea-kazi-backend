/** @format */

import { injectable } from 'tsyringe';
import { JobCategory } from '../models';
import { IRequest } from '../common/http.interface';

@injectable()
export class JobCategoryService {
  createJobCategory = async (req: IRequest): Promise<JobCategory> => {
    const checkCategoryName = await JobCategory.findOne({
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
    return await JobCategory.create({ ...createCategory }).save();
  };
}
