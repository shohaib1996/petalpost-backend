import mongoose from "mongoose";
import { IComment, IReply } from "./comment.interface";
import { Comment } from "./comment.model";


const createCommentIntoDB = async (payload: IComment) => {
  const result = await Comment.create(payload);
  return result;
};
const addReplyToCommentIntoDB = async (
  commentId: string,
  replyData: IReply
) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new Error("Comment not found");
  }

  comment.replies.push(replyData); 
  const result = await comment.save();

  return result;
};

const updateCommentInDB = async (
  commentId: string,
  updatedCommentData: Partial<IComment>,
  userId: mongoose.Types.ObjectId,
) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new Error("Comment not found");
  }

  
  if (comment.userId.toString() !== userId.toString()) {
    throw new Error("You are not authorized to update this comment");
  }

  comment.comment = updatedCommentData.comment || comment.comment;

  const result = await comment.save();
  return result;
};


const deleteCommentFromDB = async (commentId: string, userId: mongoose.Types.ObjectId) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new Error("Comment not found");
  }

//   console.log(comment.userId.toString(), userId.toString());
  

  
  if (comment.userId.toString() !== userId.toString()) {
    throw new Error("You are not authorized to delete this comment");
  }

  await comment.deleteOne(); 
  return { message: "Comment deleted successfully" }; 
};

const getCommentById = async (commentId: string) => {
  return await Comment.findById(commentId);
};

export const CommentServices = {
  createCommentIntoDB,
  addReplyToCommentIntoDB,
  updateCommentInDB,
  deleteCommentFromDB,
  getCommentById,
};
