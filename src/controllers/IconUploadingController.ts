import { MapSettingModel, ImageModel } from "./../models";
import { prepareIcon, saveIconOnDisk } from "./../utils/uploadingIcon";

class UploadingController {
  iconUpload = async (ctx) => {
    const { id } = ctx.request.body;
    const { originalname, buffer, mimtype, size } = ctx.file;
    const readyFile = await prepareIcon(buffer, "png");
    const refToFileInFs = await saveIconOnDisk(readyFile, originalname, "png");

    const icon = new ImageModel({
      link: refToFileInFs.fileSysName,
      size: "small",
      fileSize: size,
      upLoader: null,
      mimetype: mimtype,
      imageAttachment: "icon",
      originName: refToFileInFs.originName,
      storeRoute: refToFileInFs.storeRoute,
    });
    icon.save();

    MapSettingModel.findByIdAndUpdate(
      { _id: id },
      { icon: icon },
      { new: true },
      (err, mapset) => {
        if (err) return console.log(err);
        console.log(mapset);
      }
    );
    ctx.status = 200;
  };
}
export default UploadingController;
