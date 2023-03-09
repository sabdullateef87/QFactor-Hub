import config from "config"
import User from "../domain/entities/user";
import UserModel from "../infrastructures/database/mongodb/models/user.model";
import IUserRepo from '../domain/repositories/user.repository';
import BaseException from '../exceptions/BaseException';
import NoRecordFoundException from '../exceptions/NoRecordFoundException';

import { HttpResponseCode, ResponseCode, Status } from "../utils/constants";
import { compare } from "../infrastructures/encryption/bcrypt.enc";
import { generateToken } from '../utils/jsonwebtoken';
import { logger, path } from "../utils/logger";
import { sendEmail, transporter } from "../infrastructures/services/mail_service/sendEmail";


export class AuthService {
  baseUrl = config.get<string>("BASE_URL");
  Logger = logger(path.dirname(__filename) + "/" + path.basename(__filename));
  constructor(private readonly _userRepo: IUserRepo) { }

  async login(body: User) {
    const { email, password } = body;
    if (!email || !password) throw new BaseException("Invalid login parameters", 0, "");

    const isExists = await this._userRepo.findUserByEmail(email, []);
    if (!isExists) throw new NoRecordFoundException("User does not exist", ResponseCode.NOT_FOUND, Status.FAILURE);
    const isMatch = compare(body.password, isExists.password);
    if (!isMatch) throw new BaseException("Unauthorized, password incorrect", ResponseCode.BAD_REQUEST, Status.FAILURE);

    const paylod = { email };
    const token = generateToken(paylod);

    return token;
  }

  async register(body: User): Promise<User> {
    try {
      const { email, password } = body;
      if (!email || !password) throw new BaseException("Invalid login parameters", 0, "");

      const isExists = await this._userRepo.findUserByEmail(email, []);
      if (isExists) throw new BaseException("User already exist", HttpResponseCode.DUPLICATE_RECORD, Status.FAILURE);

      const newUser = new User(email, password);
      const user = await this._userRepo.createUser(newUser);
      this.Logger.info("User created successfully.")
      this.Logger.info("Attempting to send a verification link to the user.")
      await this.sendVerificationLink(email);
      return user;
    } catch (error) {
      this.Logger.error(error);
      throw error;
    }


  }
  async forgotPassword() {

  }
  async sendVerificationLink(email: string) {
    try {
      const token = generateToken(email);
      const verificationLink = `${this.baseUrl}/verify?token=${token}`

      const mailOpiton = {
        to: `${email}`,
        subject: "Verification Link",
        text: `Kindly use the link provided to verify your account -> ${verificationLink}`
      }

      this.Logger.info(`Sending verification link to - ${email}`);
      await sendEmail(mailOpiton)
        .then(info => {
          this.Logger.info(`Successfully sent verification link : ${info}`)
        })
        .catch(error => this.Logger.error(error));
    } catch (error) {
      this.Logger.error(error);
      throw new BaseException("Unable to send verification SMS to the user, pushing the data to the queue for a retry", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
    }
  }


}