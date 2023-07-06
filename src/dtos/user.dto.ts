import Joi from "joi";
import { Role } from "../domain/interfaces/user.interface";

export interface CreateUserDto {
  email: string,
  password: string
}
export interface ForgotPasswordDto {
  email: string,
  newPassword: string,
  confirmNewPassword: string
}

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
})

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(8).required(),
  confirmNewPassword: Joi.string().min(8).required()
})

export const updateRoleUserSchema = Joi.object({
  email: Joi.string().email().required(),
  role: Joi.string().valid(...Object.values(Role)).min(3).required(),
})