import mongoose from "mongoose";
import UserModel, { userSchema } from "../user.model";
import IUserRepo from "../../../../domain/repositories/user.repository";
import User from "../../../../domain/entities/User";
import NoRecordFoundException from '../../../../Exception/NoRecordFoundException';
import { Status } from "../../../../utils/constants";

export default class UserRepoMongo implements IUserRepo {

  async createUser(input: IUser): Promise<User> {
    const isExist = await UserModel.findOne({ email: input.email });
    if (isExist) throw new Error(`User with email : ${input.email} already exists`)

    const newUser = new UserModel(input);
    await newUser.save();
    return new User(input.email, "");
  }
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email })
    if (!user) return null
    let foundUser = new User(user.email, user.password);
    return foundUser;
  }

  async findAllUsers(): Promise<User[]> {
    let users = await UserModel.find();
    return users.map(user => new User(user.email, user.password));
  }
}