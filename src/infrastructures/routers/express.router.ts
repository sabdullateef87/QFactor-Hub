import express from "express";

import { UserController } from "../../controllers";
import UserService from "../../services/user.service";
import ExpressAdapter from "../../adapters/httpAdapter/express.adapter";
import UserRepoMongo from "../database/mongodb/repository/user.mongoose.repo";
import { validateCreateUserBody } from '../../middlewares/validate_user_request';
import { restrictTo, authenticate, extractAuthenticatedUser } from "../../middlewares/authorization";
import AuthController from '../../controllers/auth.controller';
import { AuthService } from '../../services/auth.service';

const router = express.Router();

const mongoDB = new UserRepoMongo();
const userService = new UserService(mongoDB);
const authService = new AuthService(mongoDB);

const newUserController = new UserController(userService);
const authController = new AuthController(authService);

// creating user endpoints - (auth endpoints)
router.post("/create", [validateCreateUserBody], ExpressAdapter(authController.createUserController));
router.post("/login", ExpressAdapter(authController.loginController))
router.get("/verify", ExpressAdapter(authController.verifyAccountDetails))
router.get("/all", ExpressAdapter(newUserController.getAllUser));

router.put("/role", [extractAuthenticatedUser(mongoDB) , authenticate, restrictTo('ADMIN')], ExpressAdapter(newUserController.assignRoleToUserController));
// router.post("/any", [extractAuthenticatedUser(mongoDB), authenticate, restrictTo('USER')], ExpressAdapter(newUserController.sayHello));


export default router;
