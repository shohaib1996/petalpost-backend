import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import appError from "./appError";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../modules/user/user.interface";
import { NextFunction, Request, Response } from "express";
import { User } from "../modules/user/user.model";


const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new appError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { id, role, email } = decoded;
    if (!id) {
      return next(new appError(httpStatus.UNAUTHORIZED, "Invalid token!"));
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return next(
        new appError(httpStatus.NOT_FOUND, "This user is not found!")
      );
    }

    // Attach decoded user info to the request object
    req.user = decoded as JwtPayload;

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      return next(
        new appError(
          httpStatus.UNAUTHORIZED,
          "You have no access to this route"
        )
      );
    }

    next();
  });
};

export default auth;
