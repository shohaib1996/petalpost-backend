import express from "express";
import { FavoriteController } from "./favorite.controller";
import auth from "../../midddleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../midddleware/validateRequest";
import { favoriteValidation } from "./favorite.validation";


const router = express.Router();

router.post("/favorite", auth(USER_ROLE.admin, USER_ROLE.user), validateRequest(favoriteValidation), FavoriteController.addFavorite);
router.delete("/favorite", auth(USER_ROLE.admin, USER_ROLE.user), FavoriteController.removeFavorite);
router.get("/favorites", auth(USER_ROLE.admin, USER_ROLE.user), FavoriteController.getFavorites);

export const FavoriteRoutes = router;