import config from "config";
import User from "../domain/entities/user.entity";
import IUserRepo from '../domain/repositories/user.repository';
import BaseException from '../exceptions/BaseException';
import NoRecordFoundException from '../exceptions/NoRecordFoundException';

import { HttpResponseCode, ResponseCode, Status } from "../utils/constants";
import { compare } from "../infrastructures/encryption/bcrypt.enc";
import { generateToken, verifyToken } from '../utils/jsonwebtoken';
import { logger, path } from "../utils/logger";
import { sendEmail } from "../infrastructures/externalServices/mail_service/sendEmail";
import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import SecurityException from "../exceptions/SecurityException";

const jwtSecret = config.get<string>("JWT_SECRET");
const Logger = logger(path.dirname(__filename) + "/" + path.basename(__filename));
const baseUrl = config.get<string>("BASE_URL") || "hrllo";

export class AuthService {
  constructor(private readonly _userRepo: IUserRepo) { }

  async login(body: User) {
    const { email, password } = body;
    if (!email || !password) throw new BaseException("Invalid login parameters", 0, "");

    const isExists = await this._userRepo.findUserByEmail(email, []);

    if (!isExists) throw new NoRecordFoundException("User does not exist", ResponseCode.NOT_FOUND, Status.FAILURE);
    const isMatch = await compare(body.password, isExists.password);
    if (!isMatch) throw new SecurityException("Unauthorized, password incorrect", HttpResponseCode.UNAUTHORIZED, Status.FAILURE);

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
      Logger.debug("User created successfully, Attempting to send a verification link to the user.");

      // TODO - send request to kafka for processing.
      // await this.sendVerificationLink(email);
      return user;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async forgotPassword() { }

  async sendVerificationLink(email: string) {
    try {
      const token = await generateToken(email);
      const verificationLink = `${baseUrl}/verify?token=${token}`;

      const mailOpiton = {
        to: `${email}`,
        subject: "Verification Link",
        text: `Kindly use the link provided to verify your account -> ${verificationLink}`
      }
      Logger.info(`Sending verification link to - ${email}`);
      await sendEmail(mailOpiton)
        .then(info => {
          Logger.info(`Successfully sent verification link : ${info}`);
        })
        .catch(error => Logger.error(error));
    } catch (error) {
      Logger.error(error);
      throw new BaseException("Unable to send verification SMS to the user, pushing the data to the queue for a retry", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
    }
  }

  async verifyNewUser(token: string): Promise<any> {
    try {
      const isTokenValid = verifyToken(token, jwtSecret) as JwtPayload;
      const email = isTokenValid as unknown as string;
      return await this._userRepo.handleVerification(email);
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new SecurityException(error.message, ResponseCode.SECURITY_REASON, Status.FAILURE);
      } else {
        throw new BaseException("Internal Server Error", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
      }
    }
  }
}
