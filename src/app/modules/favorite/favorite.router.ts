import { Router } from "express";
import { FavoriteController } from "./favorite.controller";
import auth from "../../midddleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../midddleware/validateRequest";
import { favoriteValidation } from "./favorite.validation";


const router = Router();

router.get("/favorites/:userId", auth(USER_ROLE.admin, USER_ROLE.user), FavoriteController.getFavorites);
router.post("/favorite", auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(favoriteValidation), FavoriteController.addFavorite);
router.delete("/favorite/:postId", auth(USER_ROLE.admin, USER_ROLE.user), FavoriteController.removeFavorite);

export const favoriteRoutes = router;