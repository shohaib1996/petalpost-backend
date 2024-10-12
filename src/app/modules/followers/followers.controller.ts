import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { FollowServices } from "./followers.services";



const follow = catchAsync(async (req, res) => {
  const { userId, followingId } = req.body;

  const result = await FollowServices.followUser(userId, followingId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User followed successfully.",
    data: result,
  });
});

const getFollowers = catchAsync(async (req, res) => {
    const { userId } = req.params; 
  
    const result = await FollowServices.getFollowers(userId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Followers retrieved successfully.",
      data: result,
    });
  });

export const FollowersController = {
  follow,
  getFollowers
};
