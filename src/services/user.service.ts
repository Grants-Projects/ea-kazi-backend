/** @format */

import { User } from "../models";
import { AppDataSource } from "../utils/data-source";
import { UserRepository } from "../reprository/user.repository";
import { injectable } from "tsyringe";
// import { IRequest, IResponse } from "../common/http.interface";

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
