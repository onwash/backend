import { MapSettingModel } from "./../../models";
import { checkApp } from "./../../utils/checkAccess";

export const GeneralQueries = {
  getmapsettings: async (obj, args, context, info) => {
    checkApp(context);
    return MapSettingModel.find({})
      .populate({ path: "creator", model: "User" })
      .populate({ path: "icon", model: "Image" })
      .then((allSettings) => {
        return allSettings;
      })
      .catch((err) => {
        throw err;
      });
  },
};
