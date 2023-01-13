/** @format */

import { injectable } from 'tsyringe';
import { Job } from '../models';
import { ApplyJob } from '../models/apply_job';

@injectable()
export class ApplyJobService {
  applyForJob = async (application: any): Promise<ApplyJob[]> => {
    const job = await Job.findOne({
      where: {
        id: application.job_id,
      },
    });
    if (!job) {
      throw new Error('Unable to apply. Job does not exist.!');
    }
    const jobApplication = await ApplyJob.findOne({
      where: {
        user_id: application.user.user_id,
        job_id: application.job_id,
      },
    });
    if (jobApplication) {
      throw new Error('User already applied to Job!');
    }
    delete application.user;
    console.log('app', application);
    return await ApplyJob.create(application).save();
  };
}
