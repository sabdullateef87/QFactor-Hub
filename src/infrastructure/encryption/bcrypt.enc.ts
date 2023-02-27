const bcrypt = require('bcrypt');


const hashString = async (plainText: string): Promise<string> => {

  const hashedString = await bcrypt.hash(plainText, 10);
  return hashedString;
}

const compare = async (plainText: string, hashedString: string): Promise<boolean> => {
  const isEqual = bcrypt.compare(plainText, hashString)
  return isEqual;
}

export { hashString, compare }