/** @format */

import { User } from "../models";
import { AppDataSource } from "../utils/data-source";
import { CookieOptions } from "express";
import { UserRepository } from "../repository/user.repository";
import { injectable } from "tsyringe";
// import { IRequest, IResponse } from "../common/http.interface";
import { config } from "../config";
import { RedisCache } from "../lib/redis-cache";
import { signJwt } from "../utils/jwt";
import { LoggerHelper } from "../helper/logger";
import { IRequest, IResponse } from "../common/http.interface";
import sgMail from "@sendgrid/mail";
import * as path from "path";
import * as ejs from "ejs";
import * as jwt from "jsonwebtoken";
import { EmailService } from "./email.service";
import { IEmail } from "../common/types/email";
sgMail.setApiKey(config.sendgrid.sendgrid_api_key);

@injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private redisClient: RedisCache,
    private logger: LoggerHelper,
    private emailService: EmailService
  ) {}

  cookiesOptions: CookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    // secure: true
  };

  accessTokenCookieOptions: CookieOptions = {
    ...this.cookiesOptions,
    expires: new Date(Date.now() + config.web.accessTokenExpiresIn * 60 * 1000),
    maxAge: config.web.accessTokenExpiresIn * 60 * 1000,
  };

  refreshTokenCookieOptions: CookieOptions = {
    ...this.cookiesOptions,
    expires: new Date(
      Date.now() + config.web.refreshTokenExpiresIn * 60 * 1000
    ),
    maxAge: config.web.refreshTokenExpiresIn * 60 * 1000,
  };

  signTokens = async (user: User) => {
    // 1. Create Session
    this.redisClient.set(user.id, user, config.redis.ttl);

    // 2. Create Access and Refresh tokens
    const access_token = signJwt(
      { sub: user.id },
      {
        expiresIn: `${config.web.accessTokenExpiresIn}m`,
      }
    );

    const refresh_token = signJwt(
      { sub: user.id },
      {
        expiresIn: `${config.web.refreshTokenExpiresIn}m`,
      }
    );
    this.logger.log({ access_token, refresh_token });

    return { access_token, refresh_token };
  };

  createUser = async (req: IRequest, res: IResponse) => {
    try {
      const { email } = req.body;
      console.log(email);
      const userExist = await this.userRepository.findUserByEmail(email);

      if (userExist) {
        return res.forbidden(userExist, "Account already exist please login");
      }
      const user = await this.userRepository.createUser(req.body);
      const token = jwt.sign(
        { id: user.id, email: user.email },
        config.web.jwt_activation,
        { expiresIn: "1h" }
      );

      const emailData: IEmail = {
        subject: "Account Verification",
        template_name: "sign_verify",
        recipient_email: user.email,
        short_response_message:
          "verify your password. The link will expire in 10 minutes",
        email_data1: `${config.sendgrid.client_url}/verify-account/?token=${token}`,
      };

      await this.emailService.sendEmail(
        res,
        emailData.subject,
        emailData.template_name,
        emailData.recipient_email,
        emailData.short_response_message,
        emailData.email_data1
      );
    } catch (error) {
      return res.forbidden(
        error,
        error.message || "An error occured while creating account"
      );
    }
  };

  accountActivation = async (req: IRequest, res: IResponse) => {
    const { token }: any = req.query;
    console.log({ token });
    if (token) {
      jwt.verify(token, config.web.jwt_activation, async (err, decoded) => {
        if (err) {
          return res.forbidden(
            { err },
            "Verification link expired. Please try again"
          );
        }
        const property = await this.userRepository.findUserById(decoded?.id);
        await this.userRepository.saveUser({
          ...property, // existing fields
          verified_at: new Date(), // updated fields
        });
        return res.ok(null, "User Verified Successfully");
      });
    } else {
      return res.serverError(null, "Something went wrong. Please try again.");
    }
  };

  resendAccountActivationEmail = async (req: IRequest, res: IResponse) => {
    try {
      const { email } = req.body;
      const user = await this.userRepository.findUserByEmail(email);

      // 1. Check if user exist
      if (!user) {
        return res.notFound(null, "Email doesn't exist. Please signup");
      }

      // 2.Check if user is verified
      if (user.verified_at) {
        return res.badGateway(
          null,
          "You are already verified, Please kindly login"
        );
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        config.web.jwt_activation,
        { expiresIn: "1h" }
      );

      const emailData: IEmail = {
        subject: "Account Verification",
        template_name: "sign_verify",
        recipient_email: user.email,
        short_response_message:
          "verify your password again :) . The link will expire in 10 minutes",
        email_data1: `${config.sendgrid.client_url}/verify-account/?token=${token}`,
      };

      await this.emailService.sendEmail(
        res,
        emailData.subject,
        emailData.template_name,
        emailData.recipient_email,
        emailData.short_response_message,
        emailData.email_data1
      );
    } catch (err) {
      return res.forbidden(
        err,
        err.message || "An error occured while creating account"
      );
    }
  };

  loginUser = async (req: IRequest, res: IResponse) => {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findUserByEmail(email);

      // 1. Check if user exist
      if (!user) {
        return res.notFound(null, "Invalid email or password");
      }

      // 2.Check if user is verified
      if (!user.verified_at) {
        return res.badGateway(
          null,
          "You are not verified, check your email to verify your account"
        );
      }

      //3. Check if password is valid
      if (!(await User.comparePasswords(password, user.password))) {
        return res.notFound(null, "Invalid email or password");
      }

      // 4. Sign Access and Refresh Tokens
      const { access_token, refresh_token } = await this.signTokens(user);
      // // 5. Add Cookies
      res.cookie("access_token", access_token, this.accessTokenCookieOptions);
      res.cookie(
        "refresh_token",
        refresh_token,
        this.refreshTokenCookieOptions
      );
      res.cookie("logged_in", true, {
        ...this.accessTokenCookieOptions,
        httpOnly: false,
      });

      // 6. Send response
      const data = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        bio: user.bio,
        token: access_token,
      };
      return res.ok(data, "Login Succcess");
    } catch (err) {
      return res.serverError(err, "Invalid email or password");
    }
  };
}
