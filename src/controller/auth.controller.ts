/** @format */

import { injectable } from "tsyringe";
import { IRequest, IResponse } from "../common/http.interface";
import { LoggerHelper } from "../helper/logger";
import { AuthService } from "../services/auth.service";

@injectable()
export class AuthController {
  constructor(private authService: AuthService, private logger: LoggerHelper) {}
  registerUser = async (req: IRequest, res: IResponse) => {
      await this.authService.createUser(req, res);
  };

  loginUser = async (req: IRequest, res: IResponse) => {
    await this.authService.loginUser(req, res);
  };

  secureurl = async (req: IRequest, res: IResponse) => {
    this.logger.log({ userreq: req.user });
  };

  accountActivation = async (req: IRequest, res: IResponse) => {
    await this.authService.accountActivation(req, res);
  };

  resendAccountActivationEmail = async (req: IRequest, res: IResponse) => {
    await this.authService.resendAccountActivationEmail(req, res);
  };

  refreshAccessTokenHandler = async (req: IRequest, res: IResponse) => {
    await this.authService.refreshAccessTokenHandler(req, res);
  };

  logoutHandler = async (req: IRequest, res: IResponse) => {
    await this.authService.logoutHandler(req, res);
  };

  forgotPassword = async (req: IRequest, res: IResponse) => {
    await this.authService.forgotPassword(req, res);
  };

  resetPassword = async (req: IRequest, res: IResponse) => {
    await this.authService.resetPassword(req, res);
  };
}
