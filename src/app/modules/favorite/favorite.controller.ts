// favorite.controller.ts
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { JwtPayload } from "jsonwebtoken";
import { FavoriteService } from "./favorite.services";

const addFavorite = catchAsync(async (req: Request, res: Response) => {

  console.log(req);
  
  const userId = (req.user as JwtPayload).id; // Get user ID from token
  const postId = req.body.postId;

  const result = await FavoriteService.addFavoritePost(userId, postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post added to favorites successfully.",
    data: result,
  });
});

const removeFavorite = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as JwtPayload).id; // Get user ID from token
  const postId = req.body.postId;

  const result = await FavoriteService.removeFavoritePost(userId, postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post removed from favorites successfully.",
    data: result,
  });
});

const getFavorites = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;

  console.log(userId);
  

  const favorites = await FavoriteService.getFavoritePostsByUserId(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Favorites retrieved successfully",
    data: favorites,
  });
});


export const FavoriteController = {
  addFavorite,
  removeFavorite,
  getFavorites,
};
