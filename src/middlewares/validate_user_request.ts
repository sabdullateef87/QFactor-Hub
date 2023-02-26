import { Request, Response, NextFunction } from "express"
import { isCreateUserDtoValidated } from '../utils/validators/user/index';
import { createUserSchema } from "../utils/validators/user/user.schema";
import ValidationException from '../Exception/ValidationException';
import { HTTP, ResponseCode, Status } from "../utils/constants";


export const validateCreateUserRequest = (req: Request, res: Response, next: NextFunction) => {
  if (!isCreateUserDtoValidated(req.body)) {
    return res.status(400).json({ "message": `Bad Request` })
  }
  next();
}


export const validateCreateUserBody = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password
    }
    const isValid = createUserSchema.validate(user);
    if (isValid.error) {
      const errorMessage = isValid.error.message;
      let error = new ValidationException(errorMessage, ResponseCode.BAD_REQUEST, Status.FAILURE);
      return res.status(HTTP.BAD_REQUEST).json(error);
    }
    next();
  } catch (error) {
    return res.status(400).json({ "message": error });
  }
}

