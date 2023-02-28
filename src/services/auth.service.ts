import User from "../domain/entities/User";
import { isCreateUserDtoValidated } from '../utils/validators/user/index';
import IUserRepo from '../domain/repositories/user.repository';
import BaseException from '../Exception/BaseException';
import NoRecordFoundException from '../Exception/NoRecordFoundException';
import { ResponseCode, Status } from "../utils/constants";
import UserModel from "../infrastructure/database/mongodb/user.model";
import { compare } from "../infrastructure/encryption/bcrypt.enc";
import { generateToken } from '../utils/jwts/jsonwebtoken';

export class AuthService {
  constructor(private readonly _userRepo: IUserRepo) { }

  async login(body: User) {
    const { email, password } = body;
    if (!email || !password) throw new BaseException("Invalid login parameters", 0, "");

    const isExists = await this._userRepo.findUserByEmail(email);
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

    const isExists = await this._userRepo.findUserByEmail(email);
    if (isExists) throw new BaseException("User already exist", ResponseCode.DUPLICATE_RECORD, Status.FAILURE);

    const newUser = new User(email, password);
    const user = await this._userRepo.createUser(newUser);
    return user;

  }
  forgotPassword() {

  }
  verifyEmail() {
  }
}