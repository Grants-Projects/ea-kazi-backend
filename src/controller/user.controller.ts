/** @format */

import { injectable } from "tsyringe";
import { SimpleConsoleLogger } from "typeorm";
import { IRequest, IResponse } from "../common/http.interface";
import { LoggerHelper } from "../helper/logger";
import { User } from "../models";
import { UserService } from "../services/user.service";

@injectable()
export class UserController {
  constructor(private userService: UserService, private logger: LoggerHelper) {}
  registerUser = async (req: IRequest, res: IResponse) => {
      await this.userService.createUser(req, res);
  };

  loginUser = async (req: IRequest, res: IResponse) => {
    await this.userService.loginUser(req, res);
  };

  secureurl = async (req: IRequest, res: IResponse) => {
    this.logger.log({ userreq: req.user });
  };

  accountActivation = async (req: IRequest, res: IResponse) => {
    await this.userService.accountActivation(req, res);
  };

  resendAccountActivationEmail = async (req: IRequest, res: IResponse) => {
    await this.userService.resendAccountActivationEmail(req, res);
  };
}
