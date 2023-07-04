import ValidationException from '../exceptions/ValidationException';

import { Request, Response, NextFunction } from "express"
import { CreateUserDto, ForgotPasswordDto, createUserSchema, forgotPasswordSchema } from '../dtos/user.dto';
import { HttpResponseCode, ResponseCode, Status } from "../utils/constants";
import BaseException from '../exceptions/BaseException';
import BadRequestException from '../exceptions/BadRequestException';
import { logger, path } from "../utils/logger";
const Logger = logger(path.dirname(__filename) + "/" + path.basename(__filename));


const validateRequestBody = (req: Request<{}, {}, CreateUserDto>, res: Response) => {
  // do the requst body validations 
  if (!req.body.email || !req.body.password) {
    throw new BadRequestException("Invalid request body, check the request and try again", HttpResponseCode.BAD_REQUEST, Status.FAILURE);
  }
}

export const validateCreateUserBody = (req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) => {
  try {
    validateRequestBody(req, res);
    const user = {
      email: req.body.email,
      password: req.body.password
    };

    if (!isCreateUserDtoValidated(req.body)) {
      return res.status(400).send("Bad request");
    }

    const isValid = createUserSchema.validate(user);
    if (isValid.error) {
      const errorMessage = isValid.error.message;
      let error = new ValidationException(errorMessage, ResponseCode.BAD_REQUEST, Status.FAILURE);
      return res.status(HttpResponseCode.BAD_REQUEST).json(error);
    }
    next();
  } catch (error) {
    Logger.error(error);
    if (error instanceof BadRequestException) {
      return res.status(400).json(error);
    }
    return res.status(400).json({ "message": error });
  }
}

export const validateForgetPasswordRequest = (req: Request<{}, {}, ForgotPasswordDto>, res: Response, next: NextFunction) => {
  try {
    const { email, newPassword, confirmNewPassword } = req.body;
    if (!email || !newPassword || !confirmNewPassword) return new BaseException("Invalid Request Body", HttpResponseCode.BAD_REQUEST, Status.FAILURE);

    const isValid = forgotPasswordSchema.validate(req.body);
    if (isValid.error) {
      const errorMessage = isValid.error.message;
      let error = new ValidationException(errorMessage, ResponseCode.BAD_REQUEST, Status.FAILURE);
      return res.status(HttpResponseCode.BAD_REQUEST).json(error);
    }
    next();
  } catch (error) {
    return res.status(400).json({ "message": error });
  }
}

export const isCreateUserDtoValidated = (user: CreateUserDto): boolean => {
  const { email, password } = user;
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email || !email.match(validRegex)) {
    throw new BadRequestException("Invalid request body, Email address has a wrong pattern.", HttpResponseCode.BAD_REQUEST, Status.FAILURE);
  }
  if (password.length < 8) {
    throw new BadRequestException("Invalid request body, Passowrd must be greater than 8 characters.", HttpResponseCode.BAD_REQUEST, Status.FAILURE);
  }
  return true;
}

