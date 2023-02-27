import { AuthService } from '../services/auth.service';
import User from '../domain/entities/User';
import { HttpResponseCode } from '../utils/constants';
import MWResponse from '../dtos/response.dto';

export default class AuthController {

  constructor(private _authService: AuthService) {
    this.loginHandler = this.loginHandler.bind(this)
    this.createUserHandler = this.createUserHandler.bind(this)
  }

  async loginHandler(req: any, res: any) {
    const { email, password } = req.body;
    const user = new User(email, password);
    const token = await this._authService.login(user);

    return new MWResponse(`logged in `, token);
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
}