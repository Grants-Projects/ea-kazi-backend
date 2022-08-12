import { injectable } from 'tsyringe';
import { checkSchema } from 'express-validator';
import validate from '../lib/validate';

@injectable()
class CourseEntityValidator {
	createCourseEntity = validate(
		checkSchema({
			author_id: {
				in: ['body'],
				isString: {
					errorMessage: 'Author Id must be a string',
				},
				isUUID: {
					errorMessage: 'Auth Id  must be of a valid UUID type',
				},
				trim: true,
			},
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
		})
	);
}

export default CourseEntityValidator;
