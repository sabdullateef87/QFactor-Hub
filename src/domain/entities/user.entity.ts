import { IUser, Role } from "../interfaces/user.interface";

export default class User implements IUser {
  email: string;
  password: string;
  phoneNumber?: string;
  role?: Role;
  permissions?: string[];
  isActive?: boolean;
  isVerified?: boolean

  constructor(email: string, password: string, role?: Role, permissions?: string[], isActive?: boolean, isVerified?: boolean, phoneNumber?: string) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.permissions = permissions;
    this.isActive = isActive;
    this.isVerified = isVerified;
    this.phoneNumber = phoneNumber;
  }

  omitFields<T, K extends keyof T>(obj: T, fields: K[]): Omit<T, K> {
    const clonedObj = { ...obj };
    fields.forEach((field) => {
      delete clonedObj[field];
    });
    return clonedObj;
  }

  getUser() {
    return Object.freeze({
      email: this.email,
      role: this.role,
      permissions: this.permissions,
      isActive: this.isActive,
      isVerified: this.isVerified
    })
  }
}
