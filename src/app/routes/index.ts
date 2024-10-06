import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { postRouter } from "../modules/post/post.router";
import { commentRouters } from "../modules/comment/comment.route";
import { uploadImageRouter } from "../modules/image/uploadRoutes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/post",
    route: postRouter,
  },
  {
    path: "/",
    route: commentRouters,
  },
  {
    path: "/",
    route: uploadImageRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
