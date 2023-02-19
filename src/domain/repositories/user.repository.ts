export default interface IUserRepo {
  createUser(input: IUser): Promise<void>;
}