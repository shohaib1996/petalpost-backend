import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

interface JwtPayloadWithId extends JwtPayload {
  id: string;
}


const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully.",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const loginData = req.body;
  const result = await UserServices.loginUserIntoDB(loginData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: result.accessToken,
    data: result.result,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const userId = (req.user as JwtPayloadWithId).id;  
  const userData = req.body;

  const result = await UserServices.updateUserIntoDB(userId, userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User data updated successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  loginUser,
  updateUserProfile,

};
