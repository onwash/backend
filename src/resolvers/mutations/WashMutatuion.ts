import { WashDescriptionModel, WashCoordinatesModel } from "./../../models";
import { checkAuth, checkRole } from "./../../utils/checkAccess";

const WashMutatuion = {
  createWashCoordinates: async (
    obj,
    { washCoordinatesInput },
    context,
    info
  ) => {
    checkAuth(context);
    await checkRole(context);
    const data = new WashCoordinatesModel({
      longitude: washCoordinatesInput.longitude,
      latitude: washCoordinatesInput.latitude,
    });
    return data.save();
  },
  createWashDescription: async (
    obj,
    { washDescriptionInput },
    context,
    info
  ) => {
    checkAuth(context);
    const user = await checkRole(context);
    const data = new WashDescriptionModel({
      creator: user.id,
      coordinatesId: washDescriptionInput.coordinatesId,
      washname: washDescriptionInput.washname,
      adress: washDescriptionInput.adress,
      uptime: washDescriptionInput.uptime,
      postCount: washDescriptionInput.postCount,
      region: washDescriptionInput.region,
      options: washDescriptionInput.options,
    });
    return data.save();
  },

  updateWashDescription: async (
    obj,
    { washDescriptionInput },
    context,
    info
  ) => {
    checkAuth(context);
    await checkRole(context);
    console.log(`args: ${JSON.stringify(washDescriptionInput)}`);
    const {
      id,
      showonmap,
      adress,
      washname,
      postCount,
      uptime,
    } = washDescriptionInput;
    const Wash = WashDescriptionModel.findByIdAndUpdate(
      { _id: id },
      { showonmap, adress, washname, postCount, uptime },
      { new: true },
      (err, wash) => {
        if (err) console.log(err);
        return wash;
      }
    );
    return Wash.populate({ path: "options", model: "MapSettings" }).populate({
      path: "region",
      model: "Region",
    });
  },

  updateWashDescriptionOpts: async (
    obj,
    { washDescriptionForOptUpdateInput },
    context,
    info
  ) => {
    checkAuth(context);
    await checkRole(context);
    const { options, washId } = washDescriptionForOptUpdateInput;
    const flaten = options.map((el) => {
      return el.id;
    });
    const Wash = WashDescriptionModel.findByIdAndUpdate(
      { _id: washId },
      { options: flaten },
      { new: true },
      (err, wash) => {
        if (err) console.log(err);
        return wash;
      }
    );
    return Wash.populate({ path: "options", model: "MapSettings" }).populate({
      path: "region",
      model: "Region",
    });
  },
};
export default WashMutatuion;
