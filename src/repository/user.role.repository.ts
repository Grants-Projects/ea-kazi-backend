/** @format */

import { injectable } from 'tsyringe';
import { UserRole } from '../models';
import { AppDataSource } from '../utils/data-source';

const userRoleRepository = AppDataSource.getRepository(UserRole);

@injectable()
export class UserRoleRepository {
  createRole = async (input: Partial<UserRole>) => {
    return await userRoleRepository.save(userRoleRepository.create(input));
  };
}
