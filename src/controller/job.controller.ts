/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../common/http.interface';
import { JobService } from '../services/job.service';

@injectable()
export class JobController {
  constructor(private jobService: JobService) {}

  getAllJobs = async (req: IRequest, res: IResponse) => {
    try {
      const jobs = await this.jobService.getAllJobs(req.query);

      return res.ok(jobs, 'Jobs fetched successfully');
    } catch (error) {
      return res.serverError(
        error,
        error.message || 'An error occured while fetching courses'
      );
    }
  };

  createJob = async (req: IRequest, res: IResponse) => {
    try {
      const job = await this.jobService.createJob(req);
      return res.ok(job, 'Job created successfully');
    } catch (error) {
      return res.serverError(
        error,
        error.message || 'An error occured while creating job'
      );
    }
  };

  getJobDetails = async (req: IRequest, res: IResponse) => {
    try {
      const job = await this.jobService.getJobDetails(req.params.jobId);
      if (!job) res.notFound(null, 'Job does not exist');
      return res.ok(job, 'Job fetched successfully');
    } catch (error) {
      return res.serverError(
        error,
        error.message || 'An error occured while fetching job details'
      );
    }
  };

  recruiterJobList = async (req: IRequest, res: IResponse) => {
    try {
      console.log("here wow")
      const job = await this.jobService.recruiterJobList(req.body);
      return res.ok(job, 'Jobs fetched successfully');
    } catch (error) {
      console.log("errerr", error)
      return res.serverError(
        error,
        error.message || 'An error occured while fetching list of jobs'
      );
    }
  };

  getJobApplications = async (req: IRequest, res: IResponse) => {
    try {
      return res.ok(
        await this.jobService.getJobApplications(req.params),
        'Job fetched successfully'
      );
    } catch (error) {
      return res.serverError(
        error,
        error.message || 'An error occured while fetching job info'
      );
    }
  };
}
