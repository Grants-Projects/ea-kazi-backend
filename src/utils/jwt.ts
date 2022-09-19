import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config';

export const signJwt = (payload: Object, options: SignOptions) => {
  return jwt.sign(payload, config.web.jwt_secret, {
    ...(options && options),
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const decoded = jwt.verify(token, config.web.jwt_secret) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};

export const JWT_ISSUER = 'EA-KAZI';
export const JWT_ALGO = 'RS256';
export const JWT_TOKEN_TYPE = {
  SERVICE: 'SERVICE',
  USER: 'USER',
};

export const TOKEN_EXPIRY =
  parseInt(<string>process.env.SERVICE_TOKEN_EXPIRY) || 3600;
