import { Router } from "express";

import { FollowersValidation } from "./followers.validation";
import { FollowersController } from "./followers.controller";
import validateRequest from "../../midddleware/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../midddleware/auth";

const router = Router();

// Route for following a user
router.post(
  "/follow",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(FollowersValidation.FollowersUserZodSchema),
  FollowersController.follow
);

router.get(
  "/followers/:userId",
  auth(USER_ROLE.admin, USER_ROLE.user),
  FollowersController.getFollowers
);
router.get(
  "/following/:userId",
  auth(USER_ROLE.admin, USER_ROLE.user),
  FollowersController.getFollowing
);

export const followersRouter = router;
