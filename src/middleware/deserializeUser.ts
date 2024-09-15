import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";
import * as JwtUtils from "../utils/jwt";
import { getUserService } from "../database/users/users.services";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;

    const requestHeaders = req.headers.authorization;
    const requestCookies = req.cookies.access_token;

    if (requestHeaders && requestHeaders.startsWith("Bearer")) {
      access_token = requestHeaders.split(" ")[1];
    } else if (requestCookies) {
      access_token = requestCookies;
    }

    if (!access_token) {
      return next(new AppError(401, "You are not logged in"));
    }

    // Validate the access token
    const decoded = JwtUtils.verifyJwt<{ user: string }>(
      access_token,
      "accessTokenPublicKey"
    );

    if (!decoded) {
      return next(new AppError(401, `Invalid token or user doesn't exist`));
    }

    // Check if the user still exist
    const user = await getUserService({
      _id: decoded.user,
    });

    if (user.length === 0) {
      return next(new AppError(404, `Invalid token or session has expired`));
    }

    // Add user and roles to res.locals
    res.locals.user = user[0];

    next();
  } catch (err: any) {
    next(err);
  }
};
