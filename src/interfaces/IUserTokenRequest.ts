export interface IUserTokenRequest {
  userId: string;
  deviceIdentifier?: string;
  isOneTime?: boolean;
  scopes: string[];
  ttl: number;
  payload: object;
}
