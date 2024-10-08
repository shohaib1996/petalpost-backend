import httpStatus from "http-status";
import config from "../../config";

import { createToken } from "../../utils/tokenCreation";
import { ILoginUser, IUser } from "./user.interface";
import { User } from "./user.model";
import appError from "../../midddleware/appError";

const createUserIntoDB = async (payload: IUser) => {
  const result = User.create(payload);
  return result;
};
const loginUserIntoDB = async (loginData: ILoginUser) => {
  // Check if user exists by email
  const user = await User.isUserExistsByEmail(loginData.email);
  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, "This user is not found!");
  }

  // Verify if the password matches
  const passwordMatched = await User.isPasswordMatched(
    loginData.password,
    user.password
  );
  if (!passwordMatched) {
    throw new appError(httpStatus.FORBIDDEN, "Password does not match");
  }

  // Prepare the JWT payload
  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
    name: user.name,
    avatar: user.avatar
  };

  // Generate JWT access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  // Fetch the user details excluding the password field
  const result = await User.findOne({ email: user.email }).select("-password");

  // Return the access token and user details
  return {
    accessToken,
    result,
  };
};

const updateUserIntoDB = async (userId: string, payload: Partial<IUser>) => {
  // Find the user by ID
  const user = await User.findById(userId);
  if (!user) {
    throw new appError(httpStatus.NOT_FOUND, "User not found!");
  }

  // Use the `set` method to update the user fields based on the provided payload
  user.set(payload);

  // Save the updated user
  await user.save();

  // Return the updated user, excluding the password field
  const updatedUser = await User.findById(userId).select("-password");

  return updatedUser;
};

export const UserServices = {
  createUserIntoDB,
  loginUserIntoDB,
  updateUserIntoDB,
};
