import User from "../entities/User";
export default interface IUserRepo {
  createUser(input: IUser): Promise<User>;
  findUserByEmail(email: string): Promise<User | null>;
  findAllUsers(): Promise<User[]>
}