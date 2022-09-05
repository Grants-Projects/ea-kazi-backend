import { injectable } from 'tsyringe';
import { checkSchema } from 'express-validator';
import validate from '../lib/validate';

@injectable()
class JobEntityValidator {
	createJobEntity = validate(
		checkSchema({
			recruiter_id: {
				in: ['body'],
				isString: {
					errorMessage: 'Recruiter Id must be a string',
				},
				isUUID: {
					errorMessage: 'Recruiter Id  must be of a valid UUID type',
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

export default JobEntityValidator;
