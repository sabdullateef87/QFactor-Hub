export interface IUser {
  email: string;
  password: string;
  role: string;
  comparePassword?: (userPassword: string) => Promise<Boolean>
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CUSTOMER = 'CUSTOMER'
}