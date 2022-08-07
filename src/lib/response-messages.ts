/** @format */

import { injectable } from "tsyringe";

@injectable()
export default class ResponseMessages {
  public static STATUS_SUCCESS = "SUCCESS";
  public static STATUS_ERROR = "FAILED";
  public static BAD_REQUEST = "BAD-REQUEST";
  public static ERROR_OCURRED = "AN-ERROR-OCURRED";
  public static BAD_GATEWAY = "BAD-GATEWAY";
  public static NOT_FOUND = "NOT-FOUND";
  public static UNAUTHORIZED = "UNAUTHORIZED-ACCESS";
  public static FORBIDDEN = "FORBIDDEN";
  public static DATA_CREATED = "DATA-CREATED";
}
