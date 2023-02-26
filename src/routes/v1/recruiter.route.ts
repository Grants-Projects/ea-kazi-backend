import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { UserController } from '../../controller/user.controller';
import authMiddleware from '../../middleware/auth.middleware';

const userController: UserController = container.resolve(UserController);

// router.get('/', authMiddleware(), userController.recruiterJobList);
export default router;
