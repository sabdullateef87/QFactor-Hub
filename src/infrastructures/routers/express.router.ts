import express from "express";

import { UserController } from "../../controllers";
import UserService from "../../services/user.service";
import ExpressAdapter from "../../adapters/httpAdapter/express.adapter";
import UserRepoMongo from "../database/mongodb/repository/user.mongoose.repo";
import { validateCreateUserBody } from '../../middlewares/validate_user_request';
import { restrictTo, authenticate, extractAuthenticatedUser } from "../../middlewares/authorization";
import AuthController from '../../controllers/auth.controller';
import { AuthService } from '../../services/auth.service';
import CategoryController from "../../controllers/category.controller";
import { CategoryMongoRepo } from "../database/mongodb/repository/category.mongoose.repo";
import CategoryService from "../../services/category.service";

const userRouter = express.Router();
const categoryRouter = express.Router();

const userMongoDB = new UserRepoMongo();
const userService = new UserService(userMongoDB);
const authService = new AuthService(userMongoDB);
const newUserController = new UserController(userService);
const authController = new AuthController(authService);

const categoryMongDB = new CategoryMongoRepo()
const categoryService = new CategoryService(categoryMongDB);
const categoryController = new CategoryController(categoryService);

//user endpoints - (auth endpoints)
userRouter.post("/create", [validateCreateUserBody], ExpressAdapter(authController.createUserController));
userRouter.post("/login", ExpressAdapter(authController.loginController))
userRouter.get("/verify", ExpressAdapter(authController.verifyAccountDetails))
userRouter.get("/all", ExpressAdapter(newUserController.getAllUsersController));
userRouter.put("/role", [extractAuthenticatedUser(userMongoDB) , authenticate, restrictTo('ADMIN', 'SUPERUSER')], ExpressAdapter(newUserController.assignRoleToUserController));

//category endpoints 
categoryRouter.post("/create", ExpressAdapter(categoryController.createCategoryController));

export { userRouter , categoryRouter};
