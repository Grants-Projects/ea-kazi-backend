/** @format */

import config from "config";
import { omit } from "lodash";
import { injectable } from "tsyringe";
import { User } from "../models";
import { AppDataSource } from "../utils/data-source";

const userRepository = AppDataSource.getRepository(User);

@injectable()
export class UserRepository {
  createUser = async (input: Partial<User>) => {
    return await userRepository.save(userRepository.create(input));
  };

  findUserByEmail = async ({ email }: { email: string }): Promise<User> => {
    return await userRepository.findOneBy({ email });
  };
}
