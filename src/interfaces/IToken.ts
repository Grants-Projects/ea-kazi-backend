export interface IToken {
  token: string;
  createdAt?: Date;
  expiresAt?: Date;
}

export interface ISessionToken extends IToken {
  sessionId: string;
}
