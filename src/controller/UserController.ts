/** @format */

import { injectable } from "tsyringe";
import { IRequest, IResponse } from "../common/http.interface";
import { UserService } from "../services/user.service";

@injectable()
export class UserController {
  constructor(private userService: UserService) {}

  registerUser = async (req: IRequest, res: IResponse) => {
    try {
      const { email, password } = req.body;
    const user = await this.userService.findUserByEmail({ email });

    if (user) {
      return res.forbidden( user, 'Account already exist please login');
    }
      const data = await this.userService.createUser(req.body);
      return res.ok(data, 'Registration Successful');
    } catch (error) {
      return res.forbidden(
        error,
        error.message || 'An error occured while creating account'
      );
    }
  };
}
