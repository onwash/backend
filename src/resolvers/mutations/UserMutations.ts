import { UserModel } from "./../../models";
import bcrypt from "bcryptjs";
import { AuthenticationError } from "apollo-server-koa";

const userMutations = {
  signup: async (obj, args, context, info) => {
    return UserModel.findOne({ email: args.userInput.email })
      .then((user) => {
        if (user) {
          throw new Error("User already exsits");
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then((hashedPassword) => {
        const user = new UserModel({
          email: args.userInput.email,
          login: args.userInput.login,
          region: args.userInput.region,
          password: hashedPassword,
        });
        return user.save();
      })
      .then((result) => {
        return {
          //@ts-ignore
          ...result._doc,
          password: null,
          _id: result.id,
        };
      })
      .catch((err) => {
        throw err;
      });
  },
};
export default userMutations;
