import express, {Router, Application } from "express";
const router:Router = express.Router();
import {container} from "tsyringe";
import {UserController} from "../../controller/user.controller"
const userController: any = container.resolve(UserController)

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)

export default router;