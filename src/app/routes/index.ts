import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { postRouter } from "../modules/post/post.router";
import { commentRouters } from "../modules/comment/comment.route";
import { uploadImageRouter } from "../modules/image/uploadRoutes";
import { paymentRouters } from "../modules/payment/payment.router";
import { followersRouter } from "../modules/followers/followers.route";
import { favoriteRoutes } from "../modules/favorite/favorite.router";


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
  {
    path: "/",
    route: paymentRouters,
  },
  {
    path: "/user",
    route: followersRouter,
  },
  {
    path: "/post",
    route: favoriteRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
