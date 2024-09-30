import httpStatus from "http-status";
import appError from "../../midddleware/appError";
import { IPost } from "./post.interface";
import { Post } from "./post.model";

const getAllPostsFromDB = async () => {
  const posts = await Post.find();
  return posts;
};

const getPostByIdFromDB = async (postId: string): Promise<IPost | null> => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new appError(httpStatus.NOT_FOUND, "Post not found");
  }

  return post;
};

const createPostIntoDB = async (payload: IPost) => {
  const result = await Post.create(payload);
  return result;
};

const updatePostIntoDB = async (postId: string, payload: Partial<IPost>) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new appError(httpStatus.NOT_FOUND, "Post not found");
  }

  // Update the post fields
  Object.keys(payload).forEach((key) => {
    if (payload[key as keyof IPost] !== undefined) {
      post.set(key, payload[key as keyof IPost]);
    }
  });

  await post.save();
  return post;
};
const deletePostFromDB = async (postId: string) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new appError(httpStatus.NOT_FOUND, "Post not found");
  }

  await post.deleteOne();
};
export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  updatePostIntoDB,
  getPostByIdFromDB,
  deletePostFromDB,
};
