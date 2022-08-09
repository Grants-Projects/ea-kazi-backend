import { injectable } from 'tsyringe';
import { checkSchema } from 'express-validator';
import validate from '../lib/validate';

@injectable()
class UserEntityValidator {
  registerUserEntity = validate(
    checkSchema({
      first_name: {
        in: ['body'],
        isString: {
          errorMessage: 'Firstname must be a string',
        },
        isLength: {
          options: {
            min: 2,
          },
          errorMessage: 'Firstname must have minimum of two characters',
        },
        trim: true,
      },
      last_name: {
        in: ['body'],
        isString: {
          errorMessage: 'Lastname must be a string',
        },
        isLength: {
          options: {
            min: 2,
          },
          errorMessage: 'Lastname must have minimum of two characters',
        },
        trim: true,
      },
      email: {
        in: ['body'],
        isEmail: {
          errorMessage: 'Input a valid email',
        },
        trim: true,
      },
      password: {
        in: ['body'],
        isString: {
          errorMessage: 'Password must be a string',
        },
        isLength: {
          options: {
            min: 8,
          },
          errorMessage: 'Password must have minimum of eight characters',
        },
      },
    })
  );

  loginUserEntity = validate(
    checkSchema({
      email: {
        in: ['body'],
        isEmail: {
          errorMessage: 'Input a valid email',
        },
        trim: true,
      },
    })
  )

  accountActivation = validate(
    checkSchema({
      token: {
        in: ['query'],
        isString: {
          errorMessage: 'token must be a string',
        },
      },
    })
  )

  resendAccountActivationEmail = validate(
    checkSchema({
      email: {
        in: ['body'],
        isEmail: {
          errorMessage: 'Input a valid email',
        },
      },
    })
  )
}

export default UserEntityValidator;
