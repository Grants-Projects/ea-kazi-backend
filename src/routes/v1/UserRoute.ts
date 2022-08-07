import express, {Router, Application } from "express";
const router:Router = express.Router();
import {container} from "tsyringe";
import {UserController} from "../../controller/UserController"
const userController: any = container.resolve(UserController)

router.post('/register', userController.registerUser)

export default router;