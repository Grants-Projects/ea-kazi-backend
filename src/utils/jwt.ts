import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../config';

export const signJwt = (
  payload: Object,
  options: SignOptions
) => {
  return jwt.sign(payload, config.web.jwt_secret, {
    ...(options && options),
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    const decoded = jwt.verify(token, config.web.jwt_secret) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};
