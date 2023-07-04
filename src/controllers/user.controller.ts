import User from '../domain/entities/user.entity';
import BaseResponse from '../dtos/response.dto';
import BaseException from '../exceptions/BaseException';
import UserService from '../services/user.service';
import { HttpResponseCode, Status } from '../utils/constants';
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

  async getAllUser() {

    try {
      let users = await this._userService.getAllUsers();
      return new BaseResponse("", HttpResponseCode.SUCCESS_OK, users, Status.SUCCESS);
    } catch (error) {
      return new BaseException("", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
    }
  }
}
