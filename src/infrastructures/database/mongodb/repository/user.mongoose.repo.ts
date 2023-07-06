import UserModel, { userSchema } from "../models/user.model";
import IUserRepo from "../../../../domain/repositories/user.repository";
import User from "../../../../domain/entities/user.entity";
import BaseResponse from '../../../../dtos/response.dto';
import { HttpResponseCode, Status } from "../../../../utils/constants";
import BaseException from "../../../../exceptions/BaseException";

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
    let foundUser = new User(user.email, user.password, user?.role, user?.permissions);
    return foundUser;
  }

  async findAllUsers(): Promise<User[] | any> {
    let users = await UserModel.find();
    return users.map(user => {
      let newUser = new User(user.email, user.password, user?.role, user?.permissions, user?.isActive, user.isVerified);
      // return newUser.omitFields(newUser, ['password']);
      return newUser.getUser();
    });
  }

  async updateUserDetails(filters: any, data: any) {
    // TODO: implement update user data based on queries.
    return null;
  }

  async handleVerification(email: string): Promise<any> {
    const user = await UserModel.findOne({ email: email }) as User;
    if (user.isVerified) {
      return new BaseResponse("User has been previously verified, and will be redirected to the homepage", 200, "")
    }
    await UserModel.findOneAndUpdate({ email: email }, { isVerified: true }, { new: true })
    return new BaseResponse("User verification successfull", HttpResponseCode.SUCCESS_OK, Status.SUCCESS);
  }

  async assignRoleToUser(email: string, role: string): Promise<any> {
    try {
      const user = await this.findByEmail(email);
      return await UserModel.findOneAndUpdate({ email: user.email }, { role: role }, { new: true, fields: { password: 0 } });
    } catch (error) {
      console.log(error);
      return new BaseException("Role Update Failed", HttpResponseCode.INTERNAL_SERVER_ERROR, Status.FAILURE);
    }

  }
  assingPermissionsToUser(email: string, permissions: string[]): Promise<any> {
    // TODO :  Implement this 
    throw new Error("Method not implemented.");
  }

  private async findByEmail(email: string): Promise<User> {
    const user = await UserModel.findOne({ email }) as User;
    if (!user) throw new BaseException("User not found", HttpResponseCode.NOT_FOUND, Status.FAILURE);
    return user;
  }
}
