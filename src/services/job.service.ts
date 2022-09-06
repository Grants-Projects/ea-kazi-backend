/** @format */

import { injectable } from 'tsyringe';
import { IRequest } from '../common/http.interface';
import StateConstants from '../lib/state-constants';
import StatusConstants from '../lib/status-constants';
import { Job } from '../models/jobs';
import { JobRepository } from '../repository/job.repository';

@injectable()
export class JobService {
  constructor(private jobRepository: JobRepository) {}

  getAllJobs = async (query): Promise<Job[]> => {
    return await this.jobRepository.getAllJobs(query);
  };

  createJob = async (req: IRequest): Promise<Job> => {
    try{
    const job = req.body;
    job.state = StateConstants.DRAFT;
    job.status = StatusConstants.NEW;
    return await this.jobRepository.createJob(job);
    }catch(err){
      console.log(err)
    }
  };

  getJobDetails = async (jobId) => {
    return await this.jobRepository.getJobDetails(jobId);
  };
}
