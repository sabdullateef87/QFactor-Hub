export interface IUser {
  email: string;
  password: string;
  phoneNumber?: string;
  role?: Role;
  permissions?: string[],
  isActive?: boolean,
  isVerified?: boolean,
  createdAt?: Date
}

export enum Role {
  SUPERUSER = 'SUPERUSER',
  ADMIN = 'ADMIN',
  USER = 'USER',
  CUSTOMER = 'CUSTOMER'
}