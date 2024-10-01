import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { postRouter } from "../modules/post/post.router";
import { commentRouters } from "../modules/comment/comment.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
