/** @format */

import { injectable } from 'tsyringe';
import { IRequest, IResponse } from '../common/http.interface';
import { LoggerHelper } from '../helper/logger';
import { UserService } from '../services/user.service';

@injectable()
export class UserController {
  constructor(private userService: UserService, private logger: LoggerHelper) {}
  getUserProfile = async (req: IRequest, res: IResponse) => {
    try {
      const users = await this.userService.findUser(req.body.user.userId);
      return res.ok(users, 'users fetched successfully');
    } catch (error) {
      return res.serverError(
        error,
        error.message || 'An error occured while fetching courses'
      );
    }
  };
  getUserDetails = async (req: IRequest, res: IResponse) => {
    try {
      const users = await this.userService.findUser(req.params.userId);
      return res.ok(users, 'users fetched successfully');
    } catch (error) {
      return res.serverError(
        error,
        error.message || 'An error occured while fetching courses'
      );
    }
  };
}
