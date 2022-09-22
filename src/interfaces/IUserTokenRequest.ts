export interface IUserTokenRequest {
  userId: string;
  deviceIdentifier?: string;
  isOneTime?: boolean;
  scopes: string[];
  payload: object;
}
