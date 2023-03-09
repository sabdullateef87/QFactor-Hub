import ValidationException from '../exceptions/ValidationException';

import { Request, Response, NextFunction } from "express"
import { isCreateUserDtoValidated } from '../validators/user/index';
import { CreateUserDto, ForgotPasswordDto, createUserSchema, forgotPasswordSchema } from '../dtos/user.dto';
import { HttpResponseCode, ResponseCode, Status } from "../utils/constants";
import BaseException from '../exceptions/BaseException';


export const validateCreateUserRequest = (req: Request, res: Response, next: NextFunction) => {
  if (!isCreateUserDtoValidated(req.body)) {
    return res.status(400).json({ "message": `Bad Request` })
  }
  next();
}

export const validateCreateUserBody = (req: Request<{}, {}, CreateUserDto>, res: Response, next: NextFunction) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password
    }
    const isValid = createUserSchema.validate(user);
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

export const validateForgetPasswordRequest = (req: Request<{}, {}, ForgotPasswordDto>, res: Response, next: NextFunction) => {
  try {
    const { email, newPassword, confirmNewPassword } = req.body;
    if (!email || !newPassword || !confirmNewPassword) return new BaseException("Invalid Paramters", HttpResponseCode.BAD_REQUEST, Status.FAILURE);

    const isValid = forgotPasswordSchema.validate(req.body);
    if (isValid.error) {
      const errorMessage = isValid.error.message;
      let error = new ValidationException(errorMessage, ResponseCode.BAD_REQUEST, Status.FAILURE);
      return res.status(HttpResponseCode.BAD_REQUEST).json(error);
    }
    next();
  } catch (error) {
    return res.status(400).json({ "message": error })
  }
}