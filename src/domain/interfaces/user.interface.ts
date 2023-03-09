export interface IUser {
  email: string;
  password: string;
  role?: string;
  permissions?: string[],
  isActive?: boolean,
  isVerified?: boolean
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CUSTOMER = 'CUSTOMER'
}