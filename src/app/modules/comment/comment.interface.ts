import mongoose from "mongoose";

export interface IReply {
  userId: mongoose.Types.ObjectId;
  comment: string;
}

export interface IComment {
  postId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  comment: string;
  replies: IReply[];
}
