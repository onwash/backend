import { AuthenticationError } from "apollo-server-koa";
import { UserModel } from "./../models";

export const checkAuth = (context) => {
  if (!context.user.auth) throw new AuthenticationError("not auth");
  else return context;
};

export const checkApp = (context) => {
  if (!context.isMobileApp) throw new Error("not from app");
  else return context;
};

export const checkRole = async (context) => {
  const user = await UserModel.findById({ _id: context.user.id });
  if (user.role === "user") {
    throw new AuthenticationError("Aсcess denied");
  } else return user;
};
