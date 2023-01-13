/** @format */

import { injectable } from 'tsyringe';
import { Job } from '../models/jobs';
import { AppDataSource } from '../utils/data-source';

const jobRepository = AppDataSource.getRepository(Job);

@injectable()
export class JobRepository {
  getAllJobs = async (query): Promise<Job[]> => {
    return await jobRepository.find({
      where: {
        state: query?.state,
        status: query?.status,
      },
      relations: ['skills', 'skills.skill', 'user'],
    });
  };

  createJob = async (job: Partial<Job>) => {
    return await jobRepository.create(job).save();
  };

  getJobDetails = async (jobId) => {
    return await jobRepository.find({
      where: {
        id: jobId,
      },
      relations: ['skills', 'skills.skill', 'user'],
    });
  };
}
