export default class User implements IUser{
  email: string;
  password: string;
  private emailRegex = "";

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password
  }


  public getEmail(): string {
    return this.email;
  }
  public getPassword(): string {
    return this.password;
  }
}
