import express from "express";

import { UserController } from "../../controllers";
import UserService from "../../services/user.service";
import ExpressAdapter from "../../adapters/httpAdapter/express.adapter";
import UserRepoMongo from "../database/mongodb/repository/user.mongoose.repo";
import { validateCreateUserRequest } from '../../middlewares/validate_user_request';

const router = express.Router();

const mongoDB = new UserRepoMongo();
const userService = new UserService(mongoDB);
const newUserController = new UserController(userService);

router.post("/create", [validateCreateUserRequest], ExpressAdapter(newUserController.createUserHandler))

export default router;

