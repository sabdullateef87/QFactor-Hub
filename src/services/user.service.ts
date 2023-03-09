import User from "../domain/entities/user"
import IUserRepo from "../domain/repositories/user.repository"

export default class UserService {
  constructor(private readonly _userRepo: IUserRepo) {
  }

  async createUser(input: User) {
    return await this._userRepo.createUser(input)
  }

  async getAllUsers() {
    return await this._userRepo.findAllUsers();
  }



  // update user permission - can be done by user
}