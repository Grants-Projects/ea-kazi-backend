import express, {Router, Application } from "express";
const UserRoute:Router = express.Router();
//import container from "../config/app";
import {container} from "tsyringe";
import UserController from "../controller/UserController"
const userController: any = container.resolve(UserController)



UserRoute.post('/create',userController.doSomething)

export default UserRoute;