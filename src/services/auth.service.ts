import User from "../domain/entities/User";
import { isCreateUserDtoValidated } from '../utils/validators/user/index';
import IUserRepo from '../domain/repositories/user.repository';
import BaseException from '../Exception/BaseException';
import NoRecordFoundException from '../Exception/NoRecordFoundException';
import { ResponseCode, Status } from "../utils/constants";

export class AuthService {
  constructor(private readonly _userRepo: IUserRepo) { }

  async login(body: User) {
    const { email, password } = body;
    if (!email || !password) throw new BaseException("Invalid login parameters", 0, "");

    const isExists = await this._userRepo.findUserByEmail(email);
    if (!isExists) throw new NoRecordFoundException("User does not exist", ResponseCode.NOT_FOUND, Status.FAILURE);
  }

  async register(body: User) : Promise<User>{

    const { email, password } = body;
    if (!email || !password) throw new BaseException("Invalid login parameters", 0, "");

    const isExists = await this._userRepo.findUserByEmail(email);
    if (isExists) throw new BaseException("User already exist", ResponseCode.DUPLICATE_RECORD, Status.FAILURE);

    const newUser = { email, password };
    const user = await this._userRepo.createUser(newUser);
    return user;

  }
  forgotPassword() {

  }
  verifyEmail() {
  }
}