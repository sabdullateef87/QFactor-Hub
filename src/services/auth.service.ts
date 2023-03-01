import User from "../domain/entities/user";
import UserModel from "../infrastructures/database/mongodb/models/user.model";
import IUserRepo from '../domain/repositories/user.repository';
import BaseException from '../exceptions/BaseException';
import NoRecordFoundException from '../exceptions/NoRecordFoundException';

import { HttpResponseCode, ResponseCode, Status } from "../utils/constants";
import { compare } from "../infrastructures/encryption/bcrypt.enc";
import { generateToken } from '../utils/jsonwebtoken';
import { isCreateUserDtoValidated } from '../validators/user/index';


export class AuthService {
  constructor(private readonly _userRepo: IUserRepo) { }

  async login(body: User) {
    const { email, password } = body;
    if (!email || !password) throw new BaseException("Invalid login parameters", 0, "");

    const isExists = await this._userRepo.findUserByEmail(email, []);
    console.log(isExists);
    if (!isExists) throw new NoRecordFoundException("User does not exist", ResponseCode.NOT_FOUND, Status.FAILURE);
    const isMatch = compare(body.password, isExists.password);
    if (!isMatch) throw new BaseException("Unauthorized, password incorrect", ResponseCode.BAD_REQUEST, Status.FAILURE);

    const paylod = { email };
    const token = generateToken(paylod);

    return token;
  }

  async register(body: User): Promise<User> {

    const { email, password } = body;
    if (!email || !password) throw new BaseException("Invalid login parameters", 0, "");

    const isExists = await this._userRepo.findUserByEmail(email, []);
    if (isExists) throw new BaseException("User already exist", HttpResponseCode.DUPLICATE_RECORD, Status.FAILURE);

    const newUser = new User(email, password);
    const user = await this._userRepo.createUser(newUser);
    return user;

  }
  forgotPassword() {
  }
  verifyEmail() {
  }
}