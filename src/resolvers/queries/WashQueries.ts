import { WashCoordinatesModel, WashDescriptionModel } from "./../../models";
import { checkApp } from "./../../utils/checkAccess";

export const WashQueries = {
  getWashCoordinates: async (obj, args, context, info) => {
    checkApp(context);
    return WashCoordinatesModel.find({})
      .then((allCoordinates) => {
        return allCoordinates;
      })
      .catch((err) => {
        throw err;
      });
  },
  getAllWashDescriptions: async (obj, { coordinatesId }, context, info) => {
    checkApp(context);
    if (coordinatesId === undefined) {
      return await WashDescriptionModel.find({})
        .populate([
          {
            path: "options",
            model: "MapSettings",
          },
          {
            path: "region",
            model: "Region",
          },
        ])
        .then((AllWashDescription) => {
          return AllWashDescription;
        })
        .catch((err) => {
          throw err;
        });
    }
    return await WashDescriptionModel.find({ coordinatesId: coordinatesId })
      .populate([
        {
          path: "options",
          model: "MapSettings",
        },
        {
          path: "region",
          model: "Region",
        },
      ])
      .then((AllWashDescription) => {
        return AllWashDescription;
      })
      .catch((err) => {
        throw err;
      });
  },
};
