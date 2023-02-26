import mongoose, { Schema, model } from "mongoose";
import { compareHashedStringToPlainText, hashString } from "../../encryption/bcrypt.enc";

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  var user = this;
  if (user.isNew) {
    const hashedPassword = await hashString(user.password);
    user.password = hashedPassword;
  }
  next()
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this;
  return compareHashedStringToPlainText(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;