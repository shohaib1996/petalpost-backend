import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PostServices } from "./post.service";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
interface JwtPayloadWithId extends JwtPayload {
  id: string;
}

const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostsFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts retrieved successfully.",
    data: result,
  });
});

const getPostById = catchAsync(async (req, res) => {
  const postId = req.params.id; // Assuming the post ID is passed as a URL parameter
  const result = await PostServices.getPostByIdFromDB(postId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post retrieved successfully.",
    data: result,
  });
});

const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post created successfully.",
    data: result,
  });
});
const updatePost = catchAsync(async (req, res) => {
  const postId = req.params.id;
  const postData = req.body;

  const result = await PostServices.updatePostIntoDB(postId, postData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post updated successfully.",
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const postId = req.params.id;

  await PostServices.deletePostFromDB(postId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Post deleted successfully.",
  });
});

const votePost = catchAsync(async (req, res) => {
  const postId = new mongoose.Types.ObjectId(req.params.id);
  const { vote } = req.body;
  const userId = new mongoose.Types.ObjectId((req.user as JwtPayloadWithId).id);

  // Call the service to handle voting logic
  const result = await PostServices.voteOnPost(postId, userId, vote);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Vote registered successfully.",
    data: result,
  });
});

const getPostByUserId = catchAsync(async (req, res) => {
  const userId = req.params.userId; // Get user ID from URL parameter
  const result = await PostServices.getPostsByUserIdFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Posts retrieved successfully.",
    data: result,
  });
});

export const PostController = {
  getAllPosts,
  createPost,
  updatePost,
  getPostById,
  deletePost,
  votePost,
  getPostByUserId
};
