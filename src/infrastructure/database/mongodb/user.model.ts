import mongoose, { Schema, model } from "mongoose";
import { compare, hashString } from "../../encryption/bcrypt.enc";

export const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  var user = this;

  if(!user.isModified("password")){
    return next()
  }
  if (user.isNew) {
    const hashedPassword = await hashString(user.password);
    user.password = hashedPassword;
  }
  next()
});
const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;