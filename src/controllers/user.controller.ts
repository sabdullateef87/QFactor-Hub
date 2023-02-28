import UserService from '../services/user.service';

export default class UserController {
  constructor(private readonly _userService: UserService) {
    this.createUserHandler = this.createUserHandler.bind(this);
  }

  createUserHandler(req: any, res: any) {
    return this._userService.createUser(req.body)
  }

  sayHello(req: any, res: any){
    return "helooooooo";
  }
}
