/** @format */

import { User } from '../models';
import { CookieOptions } from 'express';
import { UserRepository } from '../repository/user.repository';
import { injectable } from 'tsyringe';
import { config } from '../config';
import { RedisCache } from '../lib/redis-cache';
import { signJwt, verifyJwt } from '../utils/jwt';
import { LoggerHelper } from '../helper/logger';
import { IRequest, IResponse } from '../common/http.interface';
import * as jwt from 'jsonwebtoken';
import { EmailService } from './email.service';
import { IEmail } from '../common/types/email';
import bcrypt from 'bcryptjs';
import { TokenService } from './token.service';
import { RoleRepository } from '../repository/role.respository';
import { UserRoleRepository } from '../repository/user.role.repository';
import { use } from 'passport';
import { UserRole } from '../constants/role.const';

@injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private redisClient: RedisCache,
    private logger: LoggerHelper,
    private emailService: EmailService,
    private roleRepository: RoleRepository,
    private userRoleRepository: UserRoleRepository
  ) {}

  logout = (res: IResponse) => {
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('refresh_token', '', { maxAge: 1 });
    res.cookie('logged_in', '', { maxAge: 1 });
  };

  logoutHandler = async (req: IRequest, res: IResponse) => {
    try {
      const user = req.user;

      await this.redisClient.delete(user.id);
      this.logout(res);

      res.status(200).json({
        status: 'success',
      });
    } catch (err) {
      return res.forbidden(err, 'An unknown error occured while logging out');
    }
  };

  createUser = async (req: IRequest, res: IResponse) => {
    try {
      const { email } = req.body;
      const { user_role } = req.body;
      const userExist = await this.userRepository.findUserByEmail(email);

      if (userExist) {
        return res.forbidden(userExist, 'Account already exist please login');
      }
      const role = await this.roleRepository.findUserByName(user_role.toLowerCase());
      if (!role) return res.notFound(null, 'user role does nor exist');
      const user = await this.userRepository.createUser(req.body);
      if (!user) res.serverError(null, 'An error occured while creating account');

      await this.userRoleRepository.createRole({
        user_id: user.id,
        role_id: role.id,
      });

      delete user.password;

      const token = jwt.sign(
        { id: user.id, email: user.email },
        config.web.jwt_activation,
        { expiresIn: config.web.jwt_email_duration }
      );

      const emailData: IEmail = {
        subject: 'Account Verification',
        template_name: 'sign_verify',
        recipient_email: user.email,
        short_response_message:
          'verify your account :) . The link will expire in 10 minutes',
        action_url: `${config.sendgrid.client_url}/verify-account/?token=${token}`,
      };

      const sent = await this.emailService.sendEmail(emailData);

      if (sent) {
        return res.ok(
          user,
          'An Email has been sent to ' +
            `${user.email}. Please follow the instructions to ${emailData.short_response_message}`
        );
      }
    } catch (error) {
      return res.forbidden(
        error,
        error.message || 'An error occured while creating account'
      );
    }
  };

  accountActivation = async (req: IRequest, res: IResponse) => {
    const { token }: any = req.query;
    if (token) {
      jwt.verify(token, config.web.jwt_activation, async (err, decoded) => {
        if (err) {
          return res.forbidden(
            { err },
            'Verification link expired. Please try again'
          );
        }
        const property = await this.userRepository.findUserById(decoded?.id);
        await this.userRepository.saveUser({
          ...property, // existing fields
          verified_at: new Date(), // updated fields
        });
        return res.ok(null, 'User Verified Successfully');
      });
    } else {
      return res.serverError(null, 'Something went wrong. Please try again.');
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
        return res.badGateway(null, 'You are already verified, Please kindly login');
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        config.web.jwt_activation,
        { expiresIn: config.web.jwt_email_duration }
      );

      const emailData: IEmail = {
        subject: 'Account Verification',
        template_name: 'sign_verify',
        recipient_email: user.email,
        short_response_message:
          'verify your password again :) . The link will expire in 10 minutes',
        action_url: `${config.sendgrid.client_url}/verify-account/?token=${token}`,
      };

      const sent = await this.emailService.sendEmail(emailData);

      if (sent) {
        return res.ok(
          user,
          'An Email has been sent to ' +
            `${user.email}. Please follow the instructions to ${emailData.short_response_message}`
        );
      }
    } catch (err) {
      return res.forbidden(
        err,
        err.message || 'An error occured while creating account'
      );
    }
  };

  loginUser = async (req: IRequest, res: IResponse) => {
    try {
      const { email, password } = req.body;
      const user = await this.userRepository.findUserByEmail(email);

      if (!user) {
        return res.notFound(null, 'Invalid email or password');
      }

      if (!user.verified_at) {
        return res.unauthorized(null, 'Account is not verified!');
      }

      const token: any = await TokenService.generateUserToken(
        {
          userId: user.id,
          scopes: ['verified', UserRole[user.user_role.toUpperCase()]],
          payload: {
            id: user.id,
            email: user.email,
            firstname: user.first_name,
            lastname: user.last_name,
          },
        },
        'ea-kazi'
      );
      // 2.Check if user is verified
      // if (!user.verified_at) {
      //   return res.badGateway(
      //     null,
      //     'You are not verified, check your email to verify your account or resend activation email'
      //   );
      // }

      //3. Check if password is valid
      if (!(await User.comparePasswords(password, user.password))) {
        return res.notFound(null, 'Invalid email or password');
      }

      // 6. Send response
      const data = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        bio: user.bio,
        token: token.token,
      };
      return res.ok(data, 'Login Success');
    } catch (err) {
      console.log(err);
      return res.serverError(err, 'Invalid email or password');
    }
  };

  forgotPassword = async (req: IRequest, res: IResponse) => {
    try {
      const { email } = req.body;
      const user = await this.userRepository.findUserByEmail(email);
      // 1. Check if user exist
      if (!user) {
        return res.notFound(
          null,
          'No Account registered with this Email. Please Register!'
        );
      }

      // 2.Check if user is verified
      if (!user.verified_at) {
        return res.badGateway(
          null,
          "You are not verified, reset password email can't be sent for unverified accounts. Please verify your account and try again"
        );
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        config.web.jwt_reset_secret,
        { expiresIn: config.web.jwt_email_duration }
      );

      const emailData: IEmail = {
        subject: 'Password Reset link',
        template_name: 'reset',
        recipient_email: user.email,
        short_response_message:
          'reset your password. The link will expire in 10 minutes',
        action_url: `${config.sendgrid.client_url}/reset-password/?token=${token}`,
      };

      await this.emailService.sendEmail(emailData);
    } catch (error) {
      return res.serverError(error, 'Something went wrong. Please try again.');
    }
  };

  resetPassword = async (req: IRequest, res: IResponse) => {
    const { token }: any = req.query;
    const { newPassword } = req.body;
    if (token) {
      jwt.verify(token, config.web.jwt_reset_secret, async (err, decoded) => {
        if (err) {
          return res.forbidden(
            { err },
            'Reset Password link expired. Please try again'
          );
        }
        const property = await this.userRepository.findUserById(decoded?.id),
          password = await bcrypt.hash(newPassword, 12);
        await this.userRepository.saveUser({
          ...property, // existing fields
          password, // updated fields
        });

        return res.ok(null, 'Password reset successful. Please Login!');
      });
    } else {
      return res.serverError(null, 'Something went wrong. Please try again.');
    }
  };
}
