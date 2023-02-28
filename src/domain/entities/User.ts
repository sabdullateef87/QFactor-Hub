import { IUser, Role } from "../interfaces/user.interface";

export default class User implements IUser {
  email: string;
  password: string;
  role: string = "USER"

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password
  }
  comparePassword?: ((userPassword: string) => Promise<Boolean>) | undefined;

  public getEmail(): string {
    return this.email;
  }
  public getPassword(): string {
    return this.password;
  }
}
