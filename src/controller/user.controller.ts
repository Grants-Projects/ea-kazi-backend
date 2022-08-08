/** @format */

import { injectable } from "tsyringe";
import { IRequest, IResponse } from "../common/http.interface";
import { User } from "../models";
import { UserService } from "../services/user.service";

@injectable()
export class UserController {
  constructor(private userService: UserService) {}
  registerUser = async (req: IRequest, res: IResponse) => {
    try {
      const { email } = req.body;
      const user = await this.userService.findUserByEmail(email);

      if (user) {
        return res.forbidden(user, "Account already exist please login");
      }
      const data = await this.userService.createUser(req.body);
      return res.ok(data, "Registration Successful");
    } catch (error) {
      return res.forbidden(
        error,
        error.message || "An error occured while creating account"
      );
    }
  };

  loginUser = async (req: IRequest, res: IResponse) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.findUserByEmail(email);

      // 1. Check if user exist
      if (!user) {
        return res.notFound(null, "Invalid email or password");
      }

      // 2.Check if user is verified
      // if (!user.verified) {
      //   return next(
      //     new AppError(
      //       401,
      //       'You are not verified, check your email to verify your account'
      //     )
      //   );
      // }

      //3. Check if password is valid
      if (!(await User.comparePasswords(password, user.password))) {
        return res.notFound(null, "Invalid email or password");
      }

      // 4. Sign Access and Refresh Tokens
      const { access_token, refresh_token } = await this.userService.signTokens(
        user
      );
      // // 5. Add Cookies
      res.cookie(
        "access_token",
        access_token,
        this.userService.accessTokenCookieOptions
      );
      res.cookie(
        "refresh_token",
        refresh_token,
        this.userService.refreshTokenCookieOptions
      );
      res.cookie("logged_in", true, {
        ...this.userService.accessTokenCookieOptions,
        httpOnly: false,
      });

      // 6. Send response
      const data = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        bio: user.bio,
        token: access_token
      }
      return res.ok(data, "Login Succcess")
    } catch (err) {
      return res.serverError(err, "Invalid email or password");
    }
  };

  secureurl =  async (req: IRequest, res: IResponse) => {
    console.log({userreq: req.user})
    // await this.userService.secureurl(req, res)
  }
}
