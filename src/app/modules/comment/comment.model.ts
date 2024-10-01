import mongoose, { model } from "mongoose";
import { IComment } from "./comment.interface";

const ReplySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);


const CommentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Types.ObjectId, required: true, ref: "Post" },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    comment: { type: String, required: true },
    replies: [ReplySchema],
  },
  {
    timestamps: true,
  }
);

export const Comment = model<IComment>('Comment', CommentSchema);
