import { IUser } from "../database/users/users.model";
import { signJwt } from "./jwt";
import config from "config";

export const signTokens = (user: IUser) => {
  //Create Access and Refresh tokens
  const access_token = signJwt({ user: user._id }, "accessTokenPrivateKey", {
    expiresIn: `${config.get<string>("accessTokenExpiresIn")}m`,
  });

  const refresh_token = signJwt({ user: user._id }, "refreshTokenPrivateKey", {
    expiresIn: `${config.get<string>("refreshTokenExpiresIn")}m`,
  });

  return { access_token, refresh_token };
};
