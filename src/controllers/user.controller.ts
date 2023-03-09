import UserService from '../services/user.service';
import { logger, path } from '../utils/logger';
const Logger = logger(path.dirname(__filename) + "/" + path.basename(__filename));

export default class UserController {
  constructor(private readonly _userService: UserService) {
    this.createUserHandler = this.createUserHandler.bind(this);
    this.getAllUser = this.getAllUser.bind(this);
  }

  async createUserHandler(req: any, res: any) {
    return await this._userService.createUser(req.body)
  }

  sayHello(req: any, res: any) {
    return { name: "adeiza", surname: "Ajay" };
  }

  async getAllUser() {
    return await this._userService.getAllUsers();
  }
}
