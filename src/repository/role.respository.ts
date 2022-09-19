/** @format */

import { injectable } from 'tsyringe';
import { Role } from '../models';
import { AppDataSource } from '../utils/data-source';

const roleRepository = AppDataSource.getRepository(Role);

@injectable()
export class RoleRepository {
  findUserByName = async (name: string): Promise<Role> => {
    return await roleRepository.findOne({ where: { name } });
  };
}
