import express from "express";
import validateRequest from "../../midddleware/validateRequest";
import { userValidationSchema } from "./user.validation";
import { UserController } from "./user.controller";
import auth from "../../midddleware/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidationSchema.userSchema),
  UserController.createUser
);
router.get("/users", auth(USER_ROLE.admin), UserController.getAllUsers);

router.post(
  "/login",
  validateRequest(userValidationSchema.loginSchema),
  UserController.loginUser
);
router.put(
  "/user/role/:id",
  auth(USER_ROLE.admin),
  validateRequest(userValidationSchema.updateUserProfileSchema),
  UserController.updateUserRole
);

router.put(
  "/user/profile",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(userValidationSchema.updateUserProfileSchema),
  UserController.updateUserProfile
);

export const userRoutes = router;
