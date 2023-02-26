import jwt, { SignOptions } from 'jsonwebtoken'; 
import config from "config";

const jwtSecret = config.get<string>("JWT_SECRET")
export const generateToken = (payload: Object, options: SignOptions = {}): string => {
  const token = jwt.sign(payload, jwtSecret, options);
  return token;
}
export const vertfyToken = (token: string, jwtSecret: string, SignOptions = {})  => {
  const isValid = jwt.verify(token, jwtSecret, SignOptions);
  return isValid;
}