import moment from 'moment';
import Jwt from 'jsonwebtoken';
import { IError, IToken, ISessionToken, IUserTokenRequest } from '../interfaces';
import { JWT_ALGO, JWT_TOKEN_TYPE, JWT_ISSUER } from '../utils/jwt';
import { ServerError, UnauthorizedAccess } from '../utils/errors/ErrorHandlers';
import { randomUUID } from 'crypto';

const CHUNK_SIZE = 64;

const createChunks = (text: string, chunkSize = CHUNK_SIZE) => {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    const part = text.substring(i, Math.min(i + chunkSize, text.length));
    chunks.push(part);
  }
  return chunks;
};
const normalizeKey = (key: string, privateKey = false): string => {
  if (/BEGIN.+KEY/.test(key)) {
    return key;
  } else if (/^LS0t/.test(key)) {
    return Buffer.from(key, 'base64').toString();
  } else if (privateKey) {
    return [
      '-----BEGIN RSA PRIVATE KEY-----',
      ...createChunks(key.replace(/\s+/g, '')),
      '-----END RSA PRIVATE KEY-----',
    ].join('\n');
  } else {
    return [
      '-----BEGIN PUBLIC KEY-----',
      ...createChunks(key.replace(/\s+/g, '')),
      '-----END PUBLIC KEY-----',
    ].join('\n');
  }
};

interface IDecodedServiceToken extends Jwt.JwtPayload {
  serviceId: string;
  scopes: string[];
  sourceService: string;
  data?: Record<string, unknown>;
}

let privateKey: string;
let publicKey: string;

const getPrivateKey = () => {
  if (!privateKey) {
    privateKey = normalizeKey(<string>process.env.SERVICE_JWT_SECRET, true);
  }
  console.log(privateKey);
  return privateKey;
};

const getPublicKey = () => {
  if (!publicKey) {
    publicKey = normalizeKey(<string>process.env.SERVICE_JWT_PUBLIC, false);
  }
  return publicKey;
};

export const TokenService = {
  async generateToken(
    payload: Record<string, unknown>,
    tokenType: string,
    audience: string
  ): Promise<any> {
    try {
      const token = await Jwt.sign({ ...payload, tokenType }, getPrivateKey(), {
        algorithm: JWT_ALGO,
        issuer: JWT_ISSUER,
        audience,
      });

      const createdAt = new Date();
      console.log('token', token);
      return Promise.resolve({
        token,
        createdAt,
      });
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async generateUserToken(
    request: IUserTokenRequest,
    audience: string
  ): Promise<ISessionToken> {
    const sessionId = randomUUID();
    const jwtPayload = {
      userId: request.userId,
      deviceIdentifier: request.deviceIdentifier,
      sessionId,
      scopes: request.scopes,
      data: request.payload,
    };

    const tokenObject = await this.generateToken(
      jwtPayload,
      JWT_TOKEN_TYPE.USER,
      audience
    );

    return {
      ...tokenObject,
      sessionId,
    };
  },

  async verifyServiceToken(token: string): Promise<IDecodedServiceToken> {
    try {
      const decoded = await Jwt.verify(token, getPublicKey(), {
        algorithms: [JWT_ALGO],
        issuer: JWT_ISSUER,
      });

      return Promise.resolve(<IDecodedServiceToken>decoded);
    } catch (err) {
      console.log(err);
      return Promise.reject(new UnauthorizedAccess(<IError>err));
    }
  },
};
