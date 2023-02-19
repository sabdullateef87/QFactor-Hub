import mongoose, { Schema, model } from "mongoose";
import { hashString } from "../../encryption/bcrypt.enc";


const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true })

const UserModel = model<IUser>("User", userSchema);

userSchema.pre('save', async (next: any) => {
  console.log("Pre saving user in db");
  const user = this;
  console.log(user);

  return next();

});

export default UserModel;