/** @format */

import { Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import { IResponse } from "../common/http.interface";

const validate =
  (validations) => async (req: Request, res: IResponse, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const errorMsg = errors.array();
    res.badRequest(null, errorMsg[0].msg);
  };

export default validate;
