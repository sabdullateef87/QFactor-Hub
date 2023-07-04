import jwt, { SignOptions } from 'jsonwebtoken';
import config from "config";
import { CookieOptions } from 'express';

const jwtSecret = config.get<string>("JWT_SECRET")

export const generateToken = async (payload: Object, options: SignOptions = {}): Promise<string> => {
  return await jwt.sign(payload, jwtSecret, options);
}
export const verifyToken = (token: string, jwtSecret: string, SignOptions = {}) => {
  return jwt.verify(token, jwtSecret, SignOptions);
}