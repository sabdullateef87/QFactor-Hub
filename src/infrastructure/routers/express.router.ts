import express from "express";

import { UserController } from "../../controllers";
import UserService from "../../services/user.service";
import ExpressAdapter from "../../adapters/httpAdapter/express.adapter";
import UserRepoMongo from "../database/mongodb/repository/user.mongoose.repo";
import { f1 } from "../../middlewares/validateUserRequest";

const router = express.Router();

const mongoDB = new UserRepoMongo();
const userService = new UserService(mongoDB);
const newUserController = new UserController(userService);


router.post("/create", [f1], ExpressAdapter(newUserController.createUserHandler))

export default router;
