/** @format */

import { CourseRepository } from '../repository/course.repository';
import { injectable } from 'tsyringe';
import { Skills } from '../models/skills';

@injectable()
export class SkillsService {
  createSkills = async (skills: any): Promise<Skills[]> => {
    return await Skills.create(skills).save();
  };

  fetchSkills = async (): Promise<Skills[]> => {
    return await Skills.find();
  };
}
