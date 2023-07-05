import mongoose, { Schema, model } from "mongoose";
import { compare, hashString } from "../../../encryption/bcrypt.enc";
import { IUser, Role } from "../../../../domain/interfaces/user.interface";

export const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Role, default: "USER" },
  permissions: [{ type: String }],
  isActive: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  createdAt: {type: Date, default: Date.now()}
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  var user = this;

  if (!user.isModified("password")) {
    return next()
  }
  if (user.isNew) {
    const hashedPassword = await hashString(user.password);
    user.permissions?.push("CAN_VIEW")
    user.password = hashedPassword;
  }
  next()
});
const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;