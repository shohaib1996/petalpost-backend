import express from "express";
import auth from "../../midddleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../midddleware/validateRequest";
import { PostValidationSchema } from "./post.validation";
import { PostController } from "./post.controller";

const router = express.Router();
router.get("/posts", PostController.getAllPosts);
router.get("/:id", auth(USER_ROLE.user, USER_ROLE.admin), PostController.getPostById);
router.post(
  "/create-post",
  auth(USER_ROLE.user),
  validateRequest(PostValidationSchema.postSchema),
  PostController.createPost
);
router.get("/user/:userId", auth(USER_ROLE.user), PostController.getPostByUserId);

router.put("/:id", auth(USER_ROLE.user), validateRequest(PostValidationSchema.updatePostValidationSchema), PostController.updatePost);

router.delete("/:id", auth(USER_ROLE.user, USER_ROLE.admin), PostController.deletePost);
router.post('/:id/vote', auth(USER_ROLE.user), validateRequest(PostValidationSchema.voteValidation), PostController.votePost);
router.get("/posts/all", auth(USER_ROLE.admin), PostController.getAllPostsWithoutPagination);
router.get("/upvotes/top-authors", auth( USER_ROLE.admin), PostController.getTopAuthors);

export const postRouter = router;
