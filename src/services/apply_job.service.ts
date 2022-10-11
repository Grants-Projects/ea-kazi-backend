/** @format */

import { injectable } from 'tsyringe';
import { ApplyJob } from '../models/apply_job';

@injectable()
export class ApplyJobService {
  applyForJob = async (application: any): Promise<ApplyJob[]> => {
    return await ApplyJob.create(application).save();
  };
}
