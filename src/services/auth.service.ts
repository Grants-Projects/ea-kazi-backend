/** @format */

import { User } from '../models';
import { UserRepository } from '../repository/user.repository';
import { injectable } from 'tsyringe';
import { RedisCache } from '../lib/redis-cache';
import { LoggerHelper } from '../helper/logger';
import { IRequest, IResponse } from '../common/http.interface';
import * as jwt from 'jsonwebtoken';
import { EmailService } from './email.service';
import { IEmail } from '../common/types/email';
import bcrypt from 'bcryptjs';
import { TokenService } from './token.service';
import { RoleRepository } from '../repository/role.respository';
import { UserRoleRepository } from '../repository/user.role.repository';
import { UserRole } from '../constants/role.const';
import { PasswordReset } from '../models/password_reset';
import Helpers from '../helper/helpers';
import { UserVerification } from '../models/user_verification';

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

      const userVerifyExist = await UserVerification.find({
        where: {
          email: email,
        },
      });

      const input = Helpers.generateOtp(email);

      if (userVerifyExist && userVerifyExist.length) {
        await UserVerification.update({ email }, { ...input });
      } else {
        await UserVerification.create({ ...input }).save();
      }

      const emailData: IEmail = {
        subject: 'Account Verification',
        template_name: 'sign_verify',
        recipient_email: user.email,
        short_response_message:
          'verify your account :). The Otp will expire in 1 hour',
        email_data: `${input.otp}`,
      };

      const sent = await this.emailService.sendEmail(emailData);

      if (sent) {
        return res.ok(
          user,
          'An Email has been sent to ' +
            `${user.email}. Please use OTP to ${emailData.short_response_message}`
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
    const { email, otp } = req.body;

    try {
      const userExist = await UserVerification.find({
        where: {
          email: email,
          otp,
        },
      });

      if (!userExist || userExist.length <= 0) {
        throw new Error('Invalid OTP. Please input valid OTP sent to your email');
      }

      if (!userExist || userExist.length <= 0) {
        throw new Error(
          'Invalid OTP. Please generate new OTP with your correct email address'
        );
      }

      if (userExist[0].expiresAt.getTime() < new Date().getTime()) {
        throw new Error('OTP expired!. Please request a new one');
      }
      const property = await this.userRepository.findUserByEmail(email);

      await this.userRepository.saveUser({
        ...property, // existing fields
        verified_at: new Date(), // updated fields
      });

      return res.ok(null, 'User Verified Successfully');
    } catch (error) {
      return res.serverError(
        error,
        error?.message || 'Something went wrong. Please try again.'
      );
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

      const userVerifyExist = await UserVerification.find({
        where: {
          email: email,
        },
      });

      const input = Helpers.generateOtp(email);

      if (userVerifyExist && userVerifyExist.length) {
        await UserVerification.update({ email }, { ...input });
      } else {
        await UserVerification.create({ ...input }).save();
      }

      const emailData: IEmail = {
        subject: 'Account Verification',
        template_name: 'sign_verify',
        recipient_email: user.email,
        short_response_message:
          'verify your account :). The Otp will expire in 1 hour',
        email_data: `${input.otp}`,
      };

      const sent = await this.emailService.sendEmail(emailData);

      if (sent) {
        return res.ok(
          user,
          'An Email has been re-sent to ' +
            `${user.email}. Please use OTP to ${emailData.short_response_message}`
        );
      }
    } catch (err) {
      return res.forbidden(
        err,
        err.message || 'An error occured while resending activation email'
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
      if (!user.verified_at) {
        return res.badGateway(
          null,
          'You are not verified, check your email to verify your account or resend activation OTP'
        );
      }

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

      const userExist = await PasswordReset.find({
        where: {
          email: email,
        },
      });

      const input = Helpers.generateOtp(email);

      if (userExist && userExist.length) {
        await PasswordReset.update({ email }, { ...input });
      } else {
        await PasswordReset.create({ ...input }).save();
      }

      const emailData: IEmail = {
        subject: 'Password Reset OTP',
        template_name: 'reset',
        recipient_email: user.email,
        short_response_message: 'reset your password. The Otp will expire in 1 hour',
        email_data: `${input.otp}`,
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
      return res.serverError(error, 'Something went wrong. Please try again.');
    }
  };

  resetPassword = async (req: IRequest, res: IResponse) => {
    const { email, otp, newPassword } = req.body;

    try {
      const userExist = await PasswordReset.find({
        where: {
          email: email,
          otp,
        },
      });

      if (!userExist || userExist.length <= 0) {
        throw new Error('Invalid OTP. Please input valid OTP sent to your email');
      }

      if (!userExist || userExist.length <= 0) {
        throw new Error(
          'Invalid OTP. Please generate new OTP with your correct email address'
        );
      }

      if (userExist[0].expiresAt.getTime() < new Date().getTime()) {
        throw new Error('OTP expired!. Please request a new one');
      }

      const property = await this.userRepository.findUserByEmail(email),
        password = await bcrypt.hash(newPassword, 12);
      await this.userRepository.saveUser({
        ...property, // existing fields
        password, // updated fields
      });

      return res.ok(null, 'Password reset successful');
    } catch (error) {
      return res.serverError(
        error,
        error?.message || 'Something went wrong. Please try again.'
      );
    }
  };
}
