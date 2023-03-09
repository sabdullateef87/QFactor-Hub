import { CreateUserDto } from "../../dtos/user.dto";

export const isCreateUserDtoValidated = (user: CreateUserDto): boolean => {
  const { email, password } = user;
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email.match(validRegex)) {
    return false;
  }
  if (password.length < 8) {
    return false
  }
  return true;
}