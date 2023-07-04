import User from '../domain/entities/user.entity';
import BaseResponse from '../dtos/response.dto';
import BaseException from '../exceptions/BaseException';
import NoRecordFoundException from '../exceptions/NoRecordFoundException';

import { Request, Response } from 'express';
import { logger, path } from '../utils/logger';
import { CookieOptions } from 'express';
import { AuthService } from '../services/auth.service';
import { HttpResponseCode, Status } from '../utils/constants';
import SecurityException from "../exceptions/SecurityException";

const Logger = logger(path.dirname(__filename) + "/" + path.basename(__filename));

export default class AuthController {
  constructor(private _authService: AuthService) {
    this.loginController = this.loginController.bind(this)
    this.createUserController = this.createUserController.bind(this)
    this.verifyAccountDetails = this.verifyAccountDetails.bind(this);
  }

  async loginController(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = new User(email, password);
      const token = await this._authService.login(user);

      return new BaseResponse(`Logging in Successfuly `, HttpResponseCode.SUCCESS_OK, token);
    } catch (error) {
      Logger.error(error);
      if (error instanceof NoRecordFoundException) {
        return new BaseException(error.message, HttpResponseCode.NOT_FOUND, Status.FAILURE);
      }
      if (error instanceof SecurityException) {
        return new SecurityException(error.message, error.httpCode, error.status);
      }
      return new BaseException("Internal server error", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
    }
  }

  async createUserController(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      let user = new User(email, password);
      await this._authService.register(user);
      return new BaseResponse(`User created successfully`, 200, undefined, Status.SUCCESS);
    } catch (error) {
      if (error instanceof BaseException) {
        Logger.error("Error => " + error);
        return new BaseException(error.message, error.httpCode, error.status);
      }
      return new BaseException("Internal Server Error ", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
    }
  }

  async forgotPassword(req: Request, res: any) {
    try {
    } catch (error) {
      if (error instanceof BaseException) {
        Logger.error("Error => " + error);
        return new BaseException(error.message, error.httpCode, error.status);
      }
      return new BaseException("Internal Server Error ", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
    }
  }

  async verifyAccountDetails(req: any, res: any) {
    try {
      const { token } = req.query;
      const res = await this._authService.verifyNewUser(token) as BaseResponse;
      return res;
    } catch (error) {
      Logger.error("Error => " + error);
      if (error instanceof SecurityException) {
        return new BaseException(error.message, HttpResponseCode.UNAUTHORIZED, Status.FAILURE);
      }
      return new BaseException("Internal Server Error ", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
    }
  }

  getCookieOptions(): CookieOptions {
    return {
      expires: new Date(
        Date.now() + 1 * 60 * 1000
      ),
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
    }
  }
}