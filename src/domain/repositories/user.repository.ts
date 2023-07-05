import User from "../entities/user.entity";
export default interface IUserRepo {
  createUser(input: User): Promise<User>;
  findUserByEmail(email: string, excludeFields: string[]): Promise<User | null>;
  findAllUsers(): Promise<User[]>;
  handleVerification(email: string): Promise<void>;
  assignRoleToUser(email: string, role: string): Promise<User | any>;
  assingPermissionsToUser(email: string, permissions: string[]): Promise<User | any>;
}