import { Request, Response } from 'express';
import { IError } from '../../interfaces';
import { ErrorCode } from './ErrorCodes';

interface ErrorParam {
  data?: unknown;
  message?: string;
}

/**
 * Handles unknown route errors
 */
export async function unknownRouteError(
  req: Request,
  res: Response
): Promise<Response> {
  return res.status(404).json({
    errors: {
      message: 'Route not found.',
      error: {
        status: 404,
      },
    },
  });
}

abstract class BaseError implements IError {
  code: string;
  message: string;
  data?: unknown;

  protected constructor(code: string, message: string, error?: unknown) {
    this.code = code;
    this.message = message;
    this.data = error;
  }
}

export class UnauthorizedAccess extends BaseError {
  constructor(error: ErrorParam) {
    super(
      ErrorCode.UNAUTHORIZED_ACCESS,
      error.message || 'Unauthorized access',
      error.data
    );
  }
}

export class ForbiddenAccess extends BaseError {
  constructor(error: ErrorParam) {
    super(ErrorCode.FORBIDDEN, error.message || 'Not permitted', error.data);
  }
}

export class ServerError extends BaseError {
  constructor(error: ErrorParam) {
    super(
      ErrorCode.SERVER_ERROR,
      error.message || 'An unexpected internal server error occurred',
      error.data
    );
  }
}

export class BadRequest extends BaseError {
  constructor(error: ErrorParam) {
    super(
      ErrorCode.BAD_REQUEST,
      error.message || 'Some important parameters are missing. See documentation',
      error.data
    );
  }
}

export class ResourceNotFoundError extends BaseError {
  constructor(error: ErrorParam) {
    super(
      ErrorCode.RESOURCE_NOT_FOUND,
      error.message || 'Resource not found',
      error.data
    );
  }
}

export const HandleErrorResponse = (errObj: unknown, res: Response): Response => {
  const err = <IError>errObj;
  console.log(err.message || 'Unexpected error occured');
  switch (err.code) {
    case ErrorCode.FORBIDDEN:
      return res.status(403).json(new ForbiddenAccess(err));
    case ErrorCode.BAD_REQUEST:
      return res.status(400).json(new BadRequest(err));
    case ErrorCode.RESOURCE_NOT_FOUND:
      return res.status(404).json(new ResourceNotFoundError(err));
    case ErrorCode.UNAUTHORIZED_ACCESS:
      return res.status(401).json(new UnauthorizedAccess(err));
    default: {
      // TODO: Internal server errors should be reported to sentry
      return res.status(500).json(new ServerError(err));
    }
  }
};
