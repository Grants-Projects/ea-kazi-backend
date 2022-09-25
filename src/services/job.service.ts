/** @format */

import { injectable } from 'tsyringe';
import { IRequest } from '../common/http.interface';
import StateConstants from '../lib/state-constants';
import StatusConstants from '../lib/status-constants';
import { Job } from '../models/jobs';
import { JobRepository } from '../repository/job.repository';
import { Skills } from '../models';
import { JobSkillCategory } from '../models';
import {
  ServerError,
  UnauthorizedAccess,
  BadRequest,
} from '../utils/errors/ErrorHandlers';

@injectable()
export class JobService {
  constructor(private jobRepository: JobRepository) {}

  getAllJobs = async (query): Promise<Job[]> => {
    return await this.jobRepository.getAllJobs(query);
  };

  createJob = async (req: IRequest): Promise<Job> => {
    try {
      const job = req.body;
      job.state = StateConstants.DRAFT;
      job.status = StatusConstants.NEW;
      let create_job = await Job.create(job).save();
      let skill = await Skills.findOne({
        where: {
          id: req.body.skill,
        },
      });
      if (!skill)
        throw new BadRequest({ data: null, message: 'Skill id is invalid' });
      await JobSkillCategory.create({
        skill_id: skill.id,
        job_id: create_job.id,
      }).save();
      return create_job;
    } catch (err) {
      throw err;
    }
  };

  getJobDetails = async (jobId) => {
    return await this.jobRepository.getJobDetails(jobId);
  };
}
