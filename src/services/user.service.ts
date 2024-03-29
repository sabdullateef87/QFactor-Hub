import User from "../domain/entities/user.entity"
import IUserRepo from "../domain/repositories/user.repository"

export default class UserService {
  constructor(private readonly _userRepo: IUserRepo) {
  }

  async createUser(input: User) {
    return await this._userRepo.createUser(input)
  }

  async getAllUsers(): Promise<User[]> {
    return await this._userRepo.findAllUsers();
  }

  async assignRoleToUser(email: string, role: string) {
    return await this._userRepo.assignRoleToUser(email, role);
  }

  // update user permission - can be done by user
}