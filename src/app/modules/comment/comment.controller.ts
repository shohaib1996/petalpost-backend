import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { CommentServices } from "./comment.service";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

interface JwtPayloadWithId extends JwtPayload {
    id: string;
  }

const createComment = catchAsync(async (req, res) => {
  const result = await CommentServices.createCommentIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post created successfully.",
    data: result,
  });
});

const replyToComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const replyData = {
    userId: new mongoose.Types.ObjectId((req.user as JwtPayloadWithId).id), // Assuming req.user has the user information
    comment: req.body.comment,
  };

  const result = await CommentServices.addReplyToCommentIntoDB(commentId, replyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reply added successfully.",
    data: result,
  });
});

const editComment = catchAsync(async (req, res) => {
    const { commentId } = req.params;
    const updatedCommentData = req.body;
    const userId = new mongoose.Types.ObjectId((req.user as JwtPayloadWithId).id)
  
    const result = await CommentServices.updateCommentInDB(commentId, updatedCommentData, userId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Comment updated successfully.",
      data: result,
    });
  });
  
  // Deleting a comment
  const deleteComment = catchAsync(async (req, res) => {
    const userId = new mongoose.Types.ObjectId((req.user as JwtPayloadWithId).id)
    const { commentId } = req.params;
  
    const result = await CommentServices.deleteCommentFromDB(commentId, userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Comment deleted successfully.",
      data: result,
    });
  });

  const getCommentsByPostId = catchAsync(async (req, res) => {
    const { id: postId } = req.params; // 'id' refers to the post ID
  
    const result = await CommentServices.getCommentsByPostIdFromDB(postId);
  
    if (!result || result.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "No comments found for this post",
        data: []
      });
    }
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Comments retrieved successfully.",
      data: result,
    });
  });
  

export const CommentController = {
  createComment,
  replyToComment,
  editComment,
  deleteComment,
  getCommentsByPostId
};
