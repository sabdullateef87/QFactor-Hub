import User from "../entities/user";
export default interface IUserRepo {
  createUser(input: User): Promise<User>;
  findUserByEmail(email: string, excludeFields: string[]): Promise<User | null>;
  findAllUsers(): Promise<User[]>
}