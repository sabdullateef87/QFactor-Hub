export interface IUser {
  email: string;
  password: string;
  role?: string;
  permissions?: string[],
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CUSTOMER = 'CUSTOMER'
}