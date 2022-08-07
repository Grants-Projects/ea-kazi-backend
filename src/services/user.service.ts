/** @format */

import { User } from "../models";
import { UserRepository } from "../repository/user.repository";
import { injectable } from "tsyringe";

@injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  createUser = async (input: Partial<User>) => {
    return await this.userRepository.createUser(input);
  };

  findUserByEmail = async ({ email }: { email: string }) => {
    return await this.userRepository.findUserByEmail({ email });
  };
}
