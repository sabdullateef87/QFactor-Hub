import express from "express";

import { UserController } from "../../controllers";
import UserService from "../../services/user.service";
import ExpressAdapter from "../../adapters/httpAdapter/express.adapter";
import UserRepoMongo from "../database/mongodb/repository/user.mongoose.repo";
import { validateCreateUserRequest, validateCreateUserBody } from '../../middlewares/validate_user_request';
import AuthController from '../../controllers/auth.controller';
import { AuthService } from '../../services/auth.service';

const router = express.Router();

const mongoDB = new UserRepoMongo();
const userService = new UserService(mongoDB);
const authService = new AuthService(mongoDB);

const newUserController = new UserController(userService);
const authController = new AuthController(authService);

router.post("/create", [validateCreateUserRequest, validateCreateUserBody], ExpressAdapter(newUserController.createUserHandler))
router.post("/register", [validateCreateUserBody], ExpressAdapter(authController.createUserHandler))
router.post("/login", ExpressAdapter(authController.loginHandler))
export default router;
