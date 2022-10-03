/** @format */

import { injectable } from 'tsyringe';
import { User } from '../models';
import { ResourceNotFoundError } from '../utils/errors/ErrorHandlers';

@injectable()
export class UserService {
  constructor() {}

  findUser = async (id: string): Promise<User> => {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (user) return user;
    throw new ResourceNotFoundError({
      data: null,
      message: 'This user does not exist',
    });
  };
}
