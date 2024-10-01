import express from "express";
import auth from "../../midddleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../midddleware/validateRequest";
import { PostValidationSchema } from "./post.validation";
import { PostController } from "./post.controller";

const router = express.Router();
router.get("/posts", PostController.getAllPosts);
router.get("/:id", auth(USER_ROLE.user), PostController.getPostById);
router.post(
  "/create-post",
  auth(USER_ROLE.user),
  validateRequest(PostValidationSchema.postSchema),
  PostController.createPost
);

router.put("/:id", auth(USER_ROLE.user), validateRequest(PostValidationSchema.updatePostValidationSchema), PostController.updatePost);

router.delete("/:id", auth(USER_ROLE.user), PostController.deletePost);
router.post('/:id/vote', auth(USER_ROLE.user), validateRequest(PostValidationSchema.voteValidation), PostController.votePost);

export const postRouter = router;
