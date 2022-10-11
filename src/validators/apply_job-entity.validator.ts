import { injectable } from 'tsyringe';
import { checkSchema } from 'express-validator';
import validate from '../lib/validate';

@injectable()
class ApplyJobEntityValidator {
  createJobEntity = validate(
    checkSchema({
      job_id: {
        in: ['body'],
        isString: {
          errorMessage: 'Job Id must be a string',
        },
        isUUID: {
          errorMessage: 'Job Id  must be of a valid UUID type',
        },
        trim: true,
      },
    })
  );
}

export default ApplyJobEntityValidator;
