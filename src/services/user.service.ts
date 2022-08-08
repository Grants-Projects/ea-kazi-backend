/** @format */

import { User } from "../models";
import { AppDataSource } from "../utils/data-source";
import { CookieOptions } from 'express';
import { UserRepository } from "../repository/user.repository";
import { injectable } from "tsyringe";
// import { IRequest, IResponse } from "../common/http.interface";
import {config} from '../config';
import { RedisCache } from "../lib/redis-cache";
import { signJwt } from "../utils/jwt";

@injectable()
export class UserService {
  constructor(private userRepository: UserRepository, private redisClient: RedisCache) {}

  cookiesOptions: CookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    // secure: true
  };

  accessTokenCookieOptions: CookieOptions = {
    ...this.cookiesOptions,
    expires: new Date(
      Date.now() + config.web.accessTokenExpiresIn * 60 * 1000
    ),
    maxAge: config.web.accessTokenExpiresIn * 60 * 1000,
  };
  
  refreshTokenCookieOptions: CookieOptions = {
    ...this.cookiesOptions,
    expires: new Date(
      Date.now() + config.web.refreshTokenExpiresIn * 60 * 1000
    ),
    maxAge: config.web.refreshTokenExpiresIn * 60 * 1000,
  };

  createUser = async (input: Partial<User>) => {
    return await this.userRepository.createUser(input);
  };

  findUserByEmail = async (email : string) => {
    return await this.userRepository.findUserByEmail({ email });
  };

  signTokens = async (user: User) => {
    // 1. Create Session
    this.redisClient.set(user.id, user, config.redis.ttl)
  
    // 2. Create Access and Refresh tokens
    const access_token = signJwt({ sub: user.id }, {
      expiresIn: `${config.web.accessTokenExpiresIn}m`,
    });

    const refresh_token = signJwt({ sub: user.id }, {
      expiresIn: `${config.web.refreshTokenExpiresIn}m`,
    });
    console.log({access_token, refresh_token})

    return { access_token, refresh_token };
  };
}
