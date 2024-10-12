import { Router } from "express";

import { FollowersValidation } from "./followers.validation";
import { FollowersController } from "./followers.controller";
import validateRequest from "../../midddleware/validateRequest";

const router = Router();

// Route for following a user
router.post(
  "/follow",
  validateRequest(FollowersValidation.FollowersUserZodSchema),
  FollowersController.follow
);

router.get('/followers/:userId',  FollowersController.getFollowers);

export const followersRouter = router;
