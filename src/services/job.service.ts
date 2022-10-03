/** @format */

import { injectable } from 'tsyringe';
import { IRequest } from '../common/http.interface';
import StateConstants from '../lib/state-constants';
import StatusConstants from '../lib/status-constants';
import { Job } from '../models/jobs';
import { JobRepository } from '../repository/job.repository';
import { Skills } from '../models';
import { JobSkillCategory } from '../models';
import { AppDataSource } from '../utils/data-source';

import {
  ServerError,
  UnauthorizedAccess,
  BadRequest,
} from '../utils/errors/ErrorHandlers';
import { UserService } from './user.service';

@injectable()
export class JobService {
  constructor(
    private jobRepository: JobRepository,
    private userService: UserService
  ) {}

  getAllJobs = async (query): Promise<Job[]> => {
    return await this.jobRepository.getAllJobs(query);
  };

  createJob = async (req: IRequest): Promise<Job> => {
    try {
      const job = req.body;
      await this.userService.findUser(req.body.user.userId);
      job.state = StateConstants.DRAFT;
      job.status = StatusConstants.NEW;
      job.recruiterId = req.body.user.userId;
      delete job.recruiter_id;
      console.log(job);
      let create_job = await Job.create(job).save();
      let skill = await Skills.findOne({
        where: {
          id: req.body.skill,
        },
      });
      if (!skill)
        throw new BadRequest({ data: null, message: 'Skill id is invalid' });

      // const jobCategory: any = new JobSkillCategory();
      // jobCategory.job = [create_job];
      // jobCategory.skill = [skill];
      // await AppDataSource.manager.save(jobCategory);
      await JobSkillCategory.create({
        skillId: skill.id,
        jobId: create_job.id,
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
