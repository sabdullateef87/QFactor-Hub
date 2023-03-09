import config from "config";
import User from '../domain/entities/user';
import MWResponse from '../dtos/response.dto';
import BaseException from '../exceptions/BaseException';
import NoRecordFoundException from '../exceptions/NoRecordFoundException';

import { logger, path } from '../utils/logger';
import { CookieOptions } from 'express';
import { AuthService } from '../services/auth.service';
import { HttpResponseCode, Status } from '../utils/constants';

export default class AuthController {
  baseUrl = config.get<string>("BASE_URL");
  Logger = logger(path.dirname(__filename) + "/" + path.basename(__filename));
  constructor(private _authService: AuthService) {
    this.loginHandler = this.loginHandler.bind(this)
    this.createUserHandler = this.createUserHandler.bind(this)
  }

  async loginHandler(req: any, res: any) {
    try {
      const { email, password } = req.body;
      const user = new User(email, password);
      const token = await this._authService.login(user);

      res.cookie("access_token", token);
      res.cookie('logged_in', true, {
        ...this.getCookieOptions(),
        httpOnly: false,
      });
      return new MWResponse(`logged in `, 200, token);
    } catch (error) {
      this.Logger.error(error);
      if (error instanceof NoRecordFoundException) {
        return new BaseException(error.message, HttpResponseCode.NOT_FOUND, Status.FAILURE);
      }
      return new BaseException("Internal server error", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
    }

  }
  async createUserHandler(req: any, res: any) {
    try {
      const { email, password } = req.body;
      let user = new User(email, password);
      await this._authService.register(user);
      return new MWResponse(`User created successfully`, 200, "")
    } catch (error) {
      if (error instanceof BaseException) {
        this.Logger.error("Error => " + error);
        return new BaseException(error.message, error.httpCode, error.status);
      }
      return new BaseException("Internal Server Error ", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
    }
  }

  async forgotPassword(req: any, res: any) {
    try {
    } catch (error) {
      if (error instanceof BaseException) {
        this.Logger.error("Error => " + error);
        return new BaseException(error.message, error.httpCode, error.status);
      }
      return new BaseException("Internal Server Error ", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
    }
  }

  async verifyAccountDetails(req: any, res: any) {
    try {
      const { token } = req.query;
      console.log(token);
      return "HELLLLOOOOO"

    } catch (error) {

    }
  }

  getCookieOptions(): CookieOptions {
    return {
      expires: new Date(
        Date.now() + 10 * 60 * 1000
      ),
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
      sameSite: 'lax',
    }
  }
}