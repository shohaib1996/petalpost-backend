import appError from "../../midddleware/appError";
import { Followers } from "./followers.model";

import httpStatus from "http-status";

// Service to follow a user
const followUser = async (userId: string, followingId: string) => {
  // Find or create the follower's document
  let userFollowers = await Followers.findOne({ userId });

  if (!userFollowers) {
    // If no record exists, create a new one
    userFollowers = await Followers.create({
      userId,
      following: [followingId],
    });
  } else {
    // If user is already following the person, throw an error
    if (userFollowers.following.includes(followingId)) {
      throw new appError(httpStatus.BAD_REQUEST, "Already following this user");
    }

    // Otherwise, add the followingId to the following array
    userFollowers.following.push(followingId);
    await userFollowers.save();
  }

  return userFollowers;
};
const getFollowers = async (userId: string) => {
  try {
    const followers = await Followers.find({ following: userId }).select(
      "userId"
    ).populate({ path: "userId", model: "User", select: "name email" });
    return followers;
  } catch (error) {
    console.error("Error retrieving followers:", error);
    throw new Error("Could not retrieve followers");
  }
};

const getFollowing = async (userId: string) => {
  try {
    // Find the user with their following list
    const user = await Followers.findOne({ userId })
      .select("following")
      .populate({ path: "following", model: "User", select: "name email" });

    if (!user) {
      throw new Error("User not found or no following data available.");
    }

    return user.following; // Return the list of users they are following
  } catch (error) {
    console.error("Error retrieving following list:", error);
    throw new Error("Could not retrieve following list");
  }
};

export const FollowServices = {
  followUser,
  getFollowers,
  getFollowing,
};
