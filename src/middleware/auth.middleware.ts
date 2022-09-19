import passport from 'passport';
import { NextFunction } from 'express';
import { IRequest, IResponse } from '../common/http.interface';

// export default (req: IRequest, res: IResponse, next: NextFunction) => {
//   passport.authenticate('jwt', function (err, user) {
//     if (err) return next(err);
//     if (!user)
//       return res.unauthorized(err);
//       delete user.comparePassword
//       delete user.password
//     req.user = user;
//     next();
//   })(req, res, next);
// };

import { TokenService } from '../services/token.service';

export default (scope: string = null) => {
  try {
    return async (req: IRequest, res: IResponse, next) => {
      let auth = req.headers['x-auth-token']
        ? req.headers['x-auth-token']
        : req.headers['Authorization'];
      let decoded = await TokenService.verifyServiceToken(auth as string);
      req.body['user'] = decoded;
      console.log(decoded);
      if (scope && !decoded.scopes.includes(scope.toLocaleUpperCase())) {
        res.forbidden(null, 'User does not have the required access scope');
      }
      next();
    };
  } catch (err) {
    console.log(err);
  }
};
