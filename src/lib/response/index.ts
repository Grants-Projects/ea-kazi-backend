/** @format */

import _ from "lodash";
import { IRequest, IResponse, INext } from "../../common/http.interface";
import {
  ok,
  created,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  serverError,
  badGateway,
  unproccessable,
} from './types';

export default (_req: IRequest, res: IResponse, next: INext) => {
  const responseTypes = {
    ok,
    created,
    badRequest,
    unauthorized,
    forbidden,
    notFound,
    serverError,
    unproccessable,
    badGateway,
  };

  _.extend(res, responseTypes);
  next();
};
