import { MapSettingModel } from "./../../models";
import { checkAuth, checkRole } from "./../../utils/checkAccess";

const MapSettingsMutation = {
  createMapSettings: async (obj, { mapSettingsInput }, context, info) => {
    const data = new MapSettingModel({
      title: mapSettingsInput.title,
      subtitle: mapSettingsInput.subtitle,
      selected: mapSettingsInput.selected,
      useInMapOption: mapSettingsInput.useInMapOption,
      icon: mapSettingsInput.icon,
      archived: mapSettingsInput.archived,
      creator: context.user.id,
    });
    return data.save();
  },

  updateMapSettings: async (obj, { mapSettingsInput }, context, info) => {
    checkAuth(context);
    await checkRole(context);
    MapSettingModel.findByIdAndUpdate(
      { _id: mapSettingsInput.id },
      {
        subtitle: mapSettingsInput.subtitle,
        useInMapOption: mapSettingsInput.useInMapOption,
        icon: mapSettingsInput.icon,
        archived: mapSettingsInput.archived,
      },
      { new: true },
      (err, mapset) => {
        if (err) return console.log(err);
        console.log(mapset);
      }
    );
  },
};
export default MapSettingsMutation;
