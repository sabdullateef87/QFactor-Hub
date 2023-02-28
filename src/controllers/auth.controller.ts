import { AuthService } from '../services/auth.service';
import User from '../domain/entities/User';
import { HttpResponseCode, Status } from '../utils/constants';
import MWResponse from '../dtos/response.dto';
import { CookieOptions } from 'express';
import BaseException from '../Exception/BaseException';
import logger from '../utils/logger';
import NoRecordFoundException from '../Exception/NoRecordFoundException';


export default class AuthController {
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
      return new MWResponse(`logged in `, token);
    } catch (error) {
      logger.error(error);
      if (error instanceof NoRecordFoundException) {
        return res.status(HttpResponseCode.NOT_FOUND).json(new BaseException(error.message, HttpResponseCode.NOT_FOUND, Status.FAILURE));
      }
      return res.status(HttpResponseCode.NOT_FOUND).json(new BaseException("Internal server error", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE));
    }

  }
  async createUserHandler(req: any, res: any) {
    try {
      const { email, password } = req.body;
      let user = new User(email, password);
      await this._authService.register(user);
      return new MWResponse(`User created successfully`, "")
    } catch (error) {
      return res.status(400).json(error);
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