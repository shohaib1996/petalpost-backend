import httpStatus from "http-status";
import appError from "../../midddleware/appError";
import { IPost } from "./post.interface";
import { Post } from "./post.model";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QuiryBuilder";




const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find().populate("author"), query)
    .filterByTitle()
    .sortByPopularity()
    .paginate(); // Apply pagination

  const posts = await postQuery.modelQuery;
  return posts;
};

const getPostByIdFromDB = async (postId: string): Promise<IPost | null> => {
  const post = await Post.findById(postId).populate("author");

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

const voteOnPost = async (
  postId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  vote: number
) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // Find if the user has already voted
  const existingVoteIndex = post.voters.findIndex(
    (voter) => voter.userId.toString() === userId.toString()
  );

  if (existingVoteIndex !== -1) {
    // User has already voted
    const existingVote = post.voters[existingVoteIndex].vote;

    if (existingVote === vote) {
      // User is trying to vote the same, so no changes needed
      return post;
    }

    // If the vote is changing, update counts
    if (existingVote === 1 && vote === -1) {
      post.upvotes -= 1;
      post.downvotes += 1;
    } else if (existingVote === -1 && vote === 1) {
      post.downvotes -= 1;
      post.upvotes += 1;
    }

    // Update the voter's vote
    post.voters[existingVoteIndex].vote = vote;
  } else {
    // If user hasn't voted before, add them to voters and update the vote count
    post.voters.push({ userId, vote });

    if (vote === 1) {
      post.upvotes += 1;
    } else if (vote === -1) {
      post.downvotes += 1;
    }
  }

  // Save the updated post
  await post.save();

  return post;
};

const getPostsByUserIdFromDB = async (userId: string) => {
  const posts = await Post.find({ author: userId }).populate("author");
  return posts;
};

const getAllPostsFromDBWithoutPagination = async () => {
  const posts = await Post.find().populate("author");
  return posts;
};

const getTopAuthorsByUpvotes = async () => {
  const result = await Post.aggregate([
    {
      $group: {
        _id: "$author",
        totalUpvotes: { $sum: "$upvotes" },
        authorName: { $first: "$author.name" } 
      }
    },
    {
      $sort: { totalUpvotes: -1 }
    },
    {
      $limit: 6
    },
    {
      $lookup: {
        from: "users", 
        localField: "_id",
        foreignField: "_id",
        as: "authorDetails"
      }
    },
    {
      $project: {
        _id: 1,
        totalUpvotes: 1,
        authorDetails: { $arrayElemAt: ["$authorDetails", 0] }
      }
    }
  ]);

  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  updatePostIntoDB,
  getPostByIdFromDB,
  deletePostFromDB,
  voteOnPost,
  getPostsByUserIdFromDB,
  getAllPostsFromDBWithoutPagination,
  getTopAuthorsByUpvotes
};
