import User from "../domain/entities/User";
import IUserRepo from "../domain/repositories/user.repository"

export default class UserService {
  constructor(private readonly _userRepo: IUserRepo) {
    
   }

  async createUser(input: User) {
    console.log("INPUT --> " + input)
    return await this._userRepo.createUser(input)
  }
  
  // async testUserService() {
  //   this._userRepo.createUser(user);
  //   return "uuuuuuuuuuuuuuuu"
  // }
}