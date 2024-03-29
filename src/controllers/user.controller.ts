import { Request, Response } from 'express';

import User from '../domain/entities/user.entity';
import BaseResponse from '../dtos/response.dto';
import { updateRoleUserSchema } from '../dtos/user.dto';
import BaseException from '../exceptions/BaseException';
import UserService from '../services/user.service';
import { HttpResponseCode, Status } from '../utils/constants';
import { logger, path } from '../utils/logger';
const Logger = logger(path.dirname(__filename) + "/" + path.basename(__filename));

export default class UserController {
  constructor(private readonly _userService: UserService) {
    this.createUserController = this.createUserController.bind(this);
    this.getAllUsersController = this.getAllUsersController.bind(this);
    this.assignRoleToUserController = this.assignRoleToUserController.bind(this);
  }

  async createUserController(req: any, res: any) {
    return await this._userService.createUser(req.body)
  }

  async getAllUsersController() {
    try {
      let users = await this._userService.getAllUsers();
      return new BaseResponse("", HttpResponseCode.SUCCESS_OK, users, Status.SUCCESS);
    } catch (error) {
      return new BaseException("", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
    }
  }

  async assignRoleToUserController(req: Request, res: Response) {
    const isValid = updateRoleUserSchema.validate(req.body);
    if (isValid.error){
      const errorMessage = isValid.error.message;
      return new BaseException(errorMessage, HttpResponseCode.BAD_REQUEST, Status.FAILURE);
    } 
    const { email, role } = req.body;
    return this._userService.assignRoleToUser(email, role);
  }
}
