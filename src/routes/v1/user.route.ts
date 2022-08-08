import express, {Router, Application } from "express";
const router:Router = express.Router();
import {container} from "tsyringe";
import {UserController} from "../../controller/user.controller"
import authMiddleware from "../../middleware/auth.middleware";
import AuthValidator from '../../validators/user-entity.validator';
const userController: any = container.resolve(UserController)
const authValidator: any = container.resolve(AuthValidator);

router.post('/register', authValidator.registerUserEntity, userController.registerUser)
router.post('/login', authValidator.loginUserEntity, userController.loginUser)
router.get('/secureurl', authMiddleware, userController.secureurl)

export default router;