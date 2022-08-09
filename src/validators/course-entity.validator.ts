import { injectable } from 'tsyringe';
import { checkSchema } from 'express-validator';
import validate from '../lib/validate';

@injectable()
class CourseEntityValidator {
  createCourseEntity = validate(
    checkSchema({
      name: {
        in: ['body'],
        isString: {
          errorMessage: 'Name must be a string',
        },
        isLength: {
          options: {
            min: 2,
          },
          errorMessage: 'Name must have minimum of two characters',
        },
        trim: true,
      },
      approved_by: {
        in: ['body'],
        isString: {
          errorMessage: 'Approved By must be a string',
        },
        isLength: {
          options: {
            min: 2,
          },
          errorMessage: 'Approved must have minimum of two characters',
        },
        trim: true,
      },
      owner_id: {
        in: ['body'],
        isUUID: {
          errorMessage: 'UUID must be of a valid UUID type'
        },
        trim: true,
      },
    })
  );
}

export default CourseEntityValidator;
