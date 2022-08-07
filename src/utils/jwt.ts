import jwt, { SignOptions } from 'jsonwebtoken';
import {config} from '../config';

export const signJwt = (
  payload: Object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options: SignOptions
) => {
  console.log('heyo')
  // const privateKey = Buffer.from(
  //   `${config.web.jwt_secret}${keyName}`,
  //   'base64'
  // ).toString('ascii');
  // return jwt.sign(payload, privateKey, {
  //   ...(options && options),
  //   algorithm: 'RS256',
  // });

  return jwt.sign(payload, config.web.jwt_secret, {
    expiresIn: config.web.jwt_duration,
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
): T | null => {
  try {
    const publicKey = Buffer.from(
      `${config.web.jwt_secret}${keyName}`,
      'base64'
    ).toString('ascii');
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (error) {
    return null;
  }
};
