import { injectable } from 'tsyringe';
import { checkSchema } from 'express-validator';
import validate from '../lib/validate';

@injectable()
class SkillsEntityValidator {
  createSkills = validate(
    checkSchema({
      title: {
        in: ['body'],
        isString: {
          errorMessage: 'Title must be a string',
        },
        isLength: {
          options: {
            min: 2,
          },
          errorMessage: 'Title must have minimum of two characters',
        },
        trim: true,
      },
      description: {
        in: ['body'],
        isString: {
          errorMessage: 'Description must be a string',
        },
        isLength: {
          options: {
            min: 2,
          },
          errorMessage: 'Description must have minimum of two characters',
        },
        trim: true,
      },
      thumbnail_image: {
        in: ['body'],
        isString: {
          errorMessage: 'thumbnail_image must be a string',
        },
        isLength: {
          options: {
            min: 2,
          },
          errorMessage: 'thumbnail_image must have minimum of two characters',
        },
        trim: true,
      },
      image: {
        in: ['body'],
        isString: {
          errorMessage: 'image must be a string',
        },
        isLength: {
          options: {
            min: 2,
          },
          errorMessage: 'image must have minimum of two characters',
        },
        trim: true,
      },
      position: {
        in: ['body'],
        isNumeric: {
          errorMessage: 'position must be a number',
        },
        trim: true,
      },
      parent_id: {
        in: ['body'],
        isNumeric: {
          errorMessage: 'parent_id must be a number',
        },
        trim: true,
      },
    })
  );
}

export default SkillsEntityValidator;
