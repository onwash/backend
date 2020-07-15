import sharp from "sharp";
import multer from "@koa/multer";
import fs from "fs";
import { format } from "date-fns";
import { rootPath } from "./config";

type Extention = "png" | "svg" | "jpeg" | "jpg";

const fileFilter = (req, file, cb) => {
  const extension = file.mimetype.split("/")[0];
  if (extension !== "image") {
    return cb(new Error("Не верное расширение"), false);
  }
  cb(null, true);
};

const storage = multer.memoryStorage();
const limits = {
  // fieldSize: 3,
  fields: 1,
  fileSize: 5248694,
};

const upload = multer({
  fileFilter: fileFilter,
  storage: storage,
  limits: limits,
});

const prepareIcon = async (file, format: Extention) => {
  const sharpWork = await sharp(file)
    .resize(50, 50)
    .toFormat(format)
    .toBuffer();
  return sharpWork;
};

const checkDailyFolder = async (path: string) => {
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  } catch (e) {
    console.log(`line 45: ${e}`);
  } finally {
    return path;
  }
};

const saveIconOnDisk = async (fileBinnary, name: string, extn: Extention) => {
  const folderByDate = format(Date.now(), "dd-MM-yyyy");
  const fileNameByDate = Date.now();
  const originName = name.split(".")[0];
  const withExtention = `${fileNameByDate}.${extn}`;
  const storeRoute = await checkDailyFolder(
    `${rootPath}/uploads/icons/${folderByDate}`
  );
  fs.writeFile(
    `${storeRoute}/${withExtention}`,
    fileBinnary,
    "binary",
    (err) => {
      if (err) throw err;
      return;
    }
  );
  return {
    fileSysName: withExtention,
    originName,
    storeRoute: storeRoute,
  };
};

export { prepareIcon, upload, saveIconOnDisk };
