import mongoose, { Schema, model } from "mongoose";
import { hashString } from "../../encryption/bcrypt.enc";

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true })

userSchema.pre('save', async function(next) {
  var user = this;
  const hashedPassword = await hashString(user.password);
  user.password = hashedPassword;
  next()
});

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;