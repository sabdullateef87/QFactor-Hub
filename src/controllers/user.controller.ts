import UserService from '../services/user.service';

export default class UserController {
  constructor(private readonly _userService: UserService) {
    // this.testUserService = this.testUserService.bind(this);
    this.createUserHandler = this.createUserHandler.bind(this);
  }

  createUserHandler(req: any, body: any, params: any) {
    return this._userService.createUser(body)
  }

  // testUserService(params: any, body: any, headers: any) {
  //   this._userService.testUserService()
  //   return;
  // }
}
