import mongoose from "mongoose";
import UserModel from "../user.model";
import IUserRepo from "../../../../domain/repositories/user.repository";
import User from "../../../../domain/entities/User";

export default class UserRepoMongo implements IUserRepo {

  async createUser(input: IUser): Promise<void> {

    console.log("In user repo mongo")
    const isExist = await UserModel.findOne({ email: input.email });
    if (isExist) throw new Error(`User with email : ${input.email} already exists`)

    console.log(isExist)
    const newUser = new UserModel(input);
    await newUser.save();
  }
  getUser(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getAllUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }


  testingUserServiceMongoRepo() {
    return "Testing user repo mongo"
  }

}