import express, { Router } from 'express';
const router: Router = express.Router();
import { container } from 'tsyringe';
import { UserController } from '../../controller/user.controller';
import authMiddleware from '../../middleware/auth.middleware';

const userController: any = container.resolve(UserController);
router.get('/', authMiddleware(), userController.getUserProfile);
router.get('/:userId', authMiddleware(), userController.getUserDetails);

export default router;
