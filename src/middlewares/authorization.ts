import { Response, Request, NextFunction } from "express"
import BaseException from '../exceptions/BaseException';
import { HttpResponseCode, Status } from "../utils/constants";
import { verifyToken } from "../utils/jsonwebtoken";
import config from "config";
import { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import logger from '../utils/logger';
import IUserRepo from '../domain/repositories/user.repository';
import User from '../domain/entities/user';

const jwtSecret = config.get<string>("JWT_SECRET");

export const extractAuthenticatedUser = (repo: IUserRepo) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    let access_token;
    if (req.headers.authorization !== null) {
      if (req.headers.authorization?.startsWith("BEARER")) {
        access_token = req.headers.authorization.split(" ")[1];
      }
    }
    else if (req.cookies !== undefined && req.cookies?.access_token) {
      access_token = req.cookies.access_token;
    }

    if (!access_token) return res.status(HttpResponseCode.UNAUTHORIZED).json(new BaseException("Unauthorized", HttpResponseCode.UNAUTHORIZED, Status.FAILURE));

    const isTokenValid = verifyToken(access_token, jwtSecret) as JwtPayload;
    if (!isTokenValid) return res.status(HttpResponseCode.UNAUTHORIZED).json(new BaseException("Unauthorized", HttpResponseCode.UNAUTHORIZED, Status.FAILURE));

    if (isTokenValid.email === null) return res.status(HttpResponseCode.UNAUTHORIZED).json(new BaseException("Unauthorized", HttpResponseCode.UNAUTHORIZED, Status.FAILURE));

    const exclude = ["password"];
    const user = await repo.findUserByEmail(isTokenValid.email, exclude);

    if (isTokenValid.email) {
      if (!user) return res.status(HttpResponseCode.UNAUTHORIZED).json(new BaseException("User does not exist !", HttpResponseCode.UNAUTHORIZED, Status.FAILURE));
    }

    res.locals.user = user;

    return next();
  } catch (error) {
    logger.error(`Error => ${error}`)

    if (error instanceof JsonWebTokenError) {
      return res.status(HttpResponseCode.UNAUTHORIZED).json(new BaseException("Unauthorized", HttpResponseCode.UNAUTHORIZED, Status.FAILURE))
    }
    return res.status(500).json(new BaseException("Internal Server Error", 500, Status.FAILURE));
  }
}


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    if (!user) {
      return res.status(HttpResponseCode.UNAUTHORIZED).json(new BaseException("Unauthorized", HttpResponseCode.UNAUTHORIZED, Status.FAILURE))
    }
    return next();
  } catch (err: any) {
    return res.status(500).json(new BaseException("Internal Server Error", 500, Status.FAILURE));
  }
}


export const restrictTo = (...allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!allowedRoles.includes(user.role)) {
    return res.status(HttpResponseCode.UNAUTHORIZED).json(new BaseException("Access denied", HttpResponseCode.UNAUTHORIZED, Status.FAILURE))
  }
  next();
};
