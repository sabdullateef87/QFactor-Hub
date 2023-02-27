interface IUser {
  email: string;
  password: string;
  comparePassword?: (userPassword: string) => Promise<Boolean>
}