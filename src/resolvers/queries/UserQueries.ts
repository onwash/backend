import { UserModel, RegionModel } from "./../../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secretoken } from "./../../utils/config";

import { checkAuth } from "./../../utils/checkAccess";

export const UserQueries = {
  signin: async (obj, { email, password }, context, info) => {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      throw new Error("User does exist ");
    }
    //@ts-ignore
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Pasword is incorrect");
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, secretoken, {
      expiresIn: "1d",
    });
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },

  me: async (obj, args, context, info) => {
    checkAuth(context);
    return UserModel.findById({ _id: context.user.id })
      .populate("region")
      .exec()
      .then((user) => {
        return {
          //@ts-ignore
          ...user._doc,
          password: null,
          _id: user.id,
        };
      })
      .catch((err) => {
        throw err;
      });
  },

  getAllUsers: async (obj, args, context, info) => {
    checkAuth(context);

    return UserModel.find({})
      .populate("region")
      .exec()
      .then((users) => {
        return users;
      })
      .catch((err) => {
        throw err;
      });
  },
  getRegions: async (obj, args, context, info) => {
    return RegionModel.find({})
      .then((regions) => {
        return regions;
      })
      .catch((err) => {
        throw err;
      });
  },
};
