/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../common/http.interface';
import { SkillsService } from '../services/skills.service';
import { Skills } from '../models';

@injectable()
export class SkillsController {
  constructor(private skillService: SkillsService) {}

  createSkills = async (req: IRequest, res: IResponse) => {
    try {
      req.body.is_active = true;
      return res.ok(
        await this.skillService.createSkills(req.body),
        'Skills saved successfully'
      );
    } catch (error) {
      return res.serverError(
        error,
        error.message || 'An error occured while fetching courses'
      );
    }
  };
  fetchSkills = async (req: IRequest, res: IResponse) => {
    try {
      return res.ok(
        await this.skillService.fetchSkills(),
        'Skills saved successfully'
      );
    } catch (error) {
      return res.serverError(
        error,
        error.message || 'An error occured while fetching courses'
      );
    }
  };
}
