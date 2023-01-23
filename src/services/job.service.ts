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
import { ApplyJob } from '../models/apply_job';

@injectable()
export class JobService {
  constructor(
    private jobRepository: JobRepository,
    private userService: UserService
  ) {}

  getAllJobs = async (query): Promise<Job[]> => {
    return await this.jobRepository.getAllJobs(query);
    // const jobs = Job.createQueryBuilder('a').leftJoin('a.recruiter_id', 'recruiter').leftJoin('a.').select([
    //   'a.state',
    //   'a.status',
    //   'a.title',
    //   'a.description',
    //   'a.location',
    //   'a.image',
    //   'a.expires_at',
    //   'a.approved_by',
    //   'a.approved_at',
    //   'a.created_at',
    //   'a.updated_at'
    // ])
  };

  createJob = async (req: IRequest): Promise<Job> => {
    try {
      const job = req.body;
      await this.userService.findUser(req.body.user.userId);
      job.state = StateConstants.DRAFT;
      job.status = StatusConstants.NEW;
      //job.recruiter_id = req.body.user.userId;
      // delete job.recruiter_id;
      const createJob = {
        title: req.body.title,
        description: req.body.description,
        skill: req.body.skill,
        culture: req.body.culture,
        location: req.body.location,
        image: req.body.image,
        recruiterId: req.body.user.userId,
      };
      console.log(createJob);
      let create_job = await Job.create(createJob).save();
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

  recruiterJobList = async (recruiter: any): Promise<Job[]> => {
    const jobs = await Job.find({
      where: {
        recruiterId: recruiter.user.userId,
      },
    });
    return jobs;
  };

  getJobApplications = async (job: any): Promise<ApplyJob[]> => {
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
        'a.status',
        'a.created_at',
        'a.updated_at',
      ])
      .where('a.job_id = :job', {
        job: job.jobId,
      })
      .getMany();
    return users;
  };
}
