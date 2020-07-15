import Router from "koa-router";
import { IconwUploadingCtr } from "./../controllers";
import { upload } from "./uploadingIcon";
const router = new Router();
const IconwUploadingController = new IconwUploadingCtr();
router.post("/upload/icon", upload.single("file"), async (ctx) =>
  IconwUploadingController.iconUpload(ctx)
);

export { router };
