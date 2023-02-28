import bcrypt from 'bcrypt';
import config from "config";

const saltRound = config.get<number>("SALT_ROUND")
const hashString = async (plainText: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(plainText, salt);
  return hashedString;
}

const compare = async (plainText: string, hashedString: string): Promise<Boolean> => {
  const isEqual = await bcrypt.compare(plainText, hashedString)
  return isEqual;
}

export { hashString, compare }