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
      try {
        let auth = req.headers['x-auth-token']
          ? req.headers['x-auth-token']
          : req.headers['Authorization'];
        if (!auth) {
          return res.forbidden(null, 'Auth is required');
        }
        let decoded = await TokenService.verifyServiceToken(auth as string);
       console.log("decoded", decoded)
        req.body['user'] = decoded;
        // console.log(decoded);
        if (scope && !decoded.scopes.includes(scope.toLocaleUpperCase())) {
          return res.forbidden(null, 'User does not have the required access scope');
        }
         console.log("here in auth")
        next();
      } catch (err) {
        return res.forbidden(null, 'Bad JWT');
      }
    };
  } catch (err) {
    console.log('wow');
  }
};
