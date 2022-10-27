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
        user_id: application.user_id,
      },
    });
    if (jobApplication) {
      throw new Error('User already applied to Job!');
    }
    return await ApplyJob.create(application).save();
  };

  getFreelancersOnAJob = async (job: any): Promise<ApplyJob[]> => {
    const jobApplied = await Job.findOne({
      where: {
        id: job.jobId,
      },
    });

    if (!jobApplied) {
      throw new Error('Job does not exist.!');
    }
    const users = await ApplyJob.createQueryBuilder('a')
      .leftJoin('a.user', 'user')
      .select([
        'a.id',
        'a.job_id',
        'user.id',
        'user.email',
        'user.first_name',
        'user.last_name',
      ])
      .where('a.job_id = :job', {
        job: job.jobId,
      })
      .getMany();
    return users;
  };
}
