import jwt, { SignOptions } from 'jsonwebtoken';
import config from "config";
import { CookieOptions } from 'express';

const jwtSecret = config.get<string>("JWT_SECRET")

export const generateToken = (payload: Object, options: SignOptions = {}): string => {
  return jwt.sign(payload, jwtSecret, options);
}
export const verifyToken = (token: string, jwtSecret: string, SignOptions = {}) => {
  return jwt.verify(token, jwtSecret, SignOptions);

}