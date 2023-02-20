import { Request, Response, NextFunction } from "express"
import { isCreateUserDtoValidated } from '../utils/validators/user/index';


export const validateCreateUserRequest = (req: Request, res: Response, next: NextFunction) => {
  if(!isCreateUserDtoValidated(req.body)){
    return res.status(400).json({"message": `Bad Request`})
  }
  next();
}


