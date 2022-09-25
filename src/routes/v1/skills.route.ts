import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { SkillsController } from '../../controller/skills.controller';
import authMiddleware from '../../middleware/auth.middleware';
import SkillEntityValidator from '../../validators/skills-validator';

const skillsController: any = container.resolve(SkillsController);
const skillValidator: any = container.resolve(SkillEntityValidator);

router.post(
  '/',
  authMiddleware(),
  skillValidator.createSkills,
  skillsController.createSkills
);

router.get('/', authMiddleware(), skillsController.fetchSkills);

export default router;
