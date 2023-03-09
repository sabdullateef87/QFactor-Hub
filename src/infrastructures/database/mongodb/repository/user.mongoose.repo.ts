import mongoose from "mongoose";
import UserModel, { userSchema } from "../models/user.model";
import IUserRepo from "../../../../domain/repositories/user.repository";
import User from "../../../../domain/entities/User";


export default class UserRepoMongo implements IUserRepo {

  async createUser(input: User): Promise<User> {
    const isExist = await UserModel.findOne({ email: input.email });
    if (isExist) throw new Error(`User with email : ${input.email} already exists`)

    const newUser = new UserModel(input);
    await newUser.save();
    return new User(input.email, newUser.password, newUser.role, newUser.permissions);
  }

  async findUserByEmail(email: string, excludeFields: string[]): Promise<User | null> {
    const exclude = excludeFields.map(field => "-" + field);
    const user = await UserModel.findOne({ email }).select(exclude);

    if (!user) return null
    let foundUser = new User(user.email, user.password, user.role, user.permissions);
    return foundUser;
  }

  async findAllUsers(): Promise<User[]> {
    let users = await UserModel.find();
    return users.map(user => new User(user.email, "", user?.role, user?.permissions));
  }
}