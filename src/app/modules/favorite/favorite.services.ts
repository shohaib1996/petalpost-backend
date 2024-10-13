// favorite.service.ts

import httpStatus from "http-status";
import appError from "../../midddleware/appError";
import mongoose from "mongoose";
import { User } from "../user/user.model";
import { Post } from "../post/post.model";
import { Favorite } from "./favorite.model";

const addFavoritePost = async (userId: string, postId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, "User not found");
  }

  const postExists = await Post.findById(postId);

  if (!postExists) {
    throw new appError(httpStatus.NOT_FOUND, "Post not found");
  }

  let favorite = await Favorite.findOne({ userId });

  if (!favorite) {
    // Create a new favorite document if none exists
    favorite = new Favorite({ userId, postId: [] });
  }

  // Check if the post is already in favorites
  const isFavorite = favorite.postId.includes(new mongoose.Types.ObjectId(postId));

  if (isFavorite) {
    throw new appError(httpStatus.BAD_REQUEST, "Post already in favorites");
  }

  // Add post to user's favorites
  favorite.postId.push(new mongoose.Types.ObjectId(postId));
  await favorite.save();

  return favorite;
};

const removeFavoritePost = async (userId: string, postId: string) => {
    const favorite = await Favorite.findOne({ userId });
    if (!favorite) {
      throw new appError(httpStatus.NOT_FOUND, "User favorites not found");
    }
  
    // Remove post from user's favorites
    favorite.postId = favorite.postId.filter(
      (favoriteId) => favoriteId.toString() !== postId
    );
  
    await favorite.save();
  
    return favorite;
};

const getFavoritePostsByUserId = async (userId: string) => {

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new appError(400, "Invalid user ID format");
  }
  const favorite = await Favorite.findOne({ userId }).populate("postId");

  if (!favorite) {
    throw new appError(404, "No favorites found for this user");
  }

  return favorite.postId;
};


export const FavoriteService = {
  addFavoritePost,
  removeFavoritePost,
  getFavoritePostsByUserId,
};
