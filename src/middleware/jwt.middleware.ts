import passportJwt from 'passport-jwt';
import { config } from '../config';
import { LoggerHelper } from '../helper/logger';
import ResponseMessages from '../lib/response-messages';
import { UserRepository } from '../repository/user.repository';
import { container } from 'tsyringe';
const logger: any = container.resolve(LoggerHelper);
/**
 * passport-jwt - A Passport strategy for authenticating with a JSON Web Token.
 * This module lets you authenticate endpoints using a JSON web token.
 * It is intended to be used to secure RESTful endpoints without sessions.
 */

const JwtStrategy = passportJwt.Strategy,
  ExtractJwt = passportJwt.ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromHeader(config.web.header_name),
  secretOrKey: config.web.jwt_secret,
};

 const userRepository = new UserRepository()

export default (passport: any) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      await userRepository.findUserById(jwt_payload.id)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((err: any) => {
          logger.log(err)
          return done(err, false, { message: ResponseMessages.FORBIDDEN });
        });
    })
  );
};
