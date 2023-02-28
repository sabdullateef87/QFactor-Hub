import User from "../entities/User";
import { IUser } from "../interfaces/user.interface";
export default interface IUserRepo {
  createUser(input: User): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findAllUsers(): Promise<User[]>
}