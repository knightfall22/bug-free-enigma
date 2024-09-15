import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserCreateType } from "../schema/schema";
import User from "../database/users/users.model";
import {
  createUserService,
  getUserService,
} from "../database/users/users.services";
import { signTokens } from "../utils/authMechanism";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../utils/cookies";
import AppError from "../utils/appError";

export const CreateUserHandler = async (
  req: Request<{}, {}, UserCreateType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const body = { ...req.body, password: hashedPassword };

    const user = await createUserService(body);

    const { access_token, refresh_token } = signTokens(user);

    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
      access_token,
    });
  } catch (error) {
    next(error);
  }
};

export const LoginUserHandler = async (
  req: Request<{}, {}, UserCreateType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const password = req.body.password;
    const user = await getUserService({ email: req.body.email });

    if (!user) {
      return next(new AppError(404, "User not found"));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

    if (!isPasswordCorrect) {
      return next(new AppError(401, "Invalid credentials"));
    }

    const { access_token, refresh_token } = signTokens(user[0]);

    res.cookie("access_token", access_token, accessTokenCookieOptions);
    res.cookie("refresh_token", refresh_token, refreshTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      message: "User logged in successfully",
      user,
      access_token,
    });
  } catch (error) {
    next(error);
  }
};
