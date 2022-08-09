import passport from 'passport';
import { NextFunction } from 'express';
import { IRequest, IResponse } from '../common/http.interface';

export default (req: IRequest, res: IResponse, next: NextFunction) => {
	passport.authenticate('jwt', function (err, user) {
		if (err) return next(err);
		if (!user) return res.unauthorized(err);
		delete user.comparePassword;
		delete user.password;
		req.user = user;
		next();
	})(req, res, next);
};
