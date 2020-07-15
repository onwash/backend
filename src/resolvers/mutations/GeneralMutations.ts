import { RegionModel } from "./../../models";
import { checkAuth, checkRole } from "./../../utils/checkAccess";

const GeneralMutations = {
  createRegion: async (obj, { regionInput }, context, info) => {
    checkAuth(context);
    const user = await checkRole(context);

    const data = new RegionModel({
      name: regionInput.name,
      latitude: regionInput.latitude,
      longitude: regionInput.longitude,
      latitudeDelta: regionInput.latitudeDelta,
      longitudeDelta: regionInput.longitudeDelta,
      creator: user.id,
    });
    return data.save();
  },
};
export default GeneralMutations;
