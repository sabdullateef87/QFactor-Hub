const bcrypt = require('bcrypt');


const hashString = async (plainText: string) : Promise<string> => {
  const hashedString = await bcrypt.hash(plainText, 10);
  return hashedString;
}

const compareHashedStringToPlainText = async (plainText: string, hashedString: string): Promise<boolean> => {
  const isEqual = bcrypt.compare(plainText, hashString)
  return isEqual;
}

export { hashString, compareHashedStringToPlainText }