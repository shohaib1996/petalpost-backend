import { Schema, model } from "mongoose";
import { IUserFollowers } from "./followers.interface";

const FollowersUserSchema = new Schema<IUserFollowers>({
  userId: { type: String, required: true, unique: true },
  following: [{ type: String, required: true }], // List of user IDs the user follows
});

export const Followers = model<IUserFollowers>("Followers", FollowersUserSchema);
