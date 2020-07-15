import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user";

export interface IImage extends Document {
  link: string;
  size: "small" | "big";
  fileSize: number;
  upLoader: IUser;
  mimetype: string;
  imageAttachment: "icon" | "washcollage" | "appsupport";
  originName: string;
  storeRoute: string;
}
const ImageSchema = new Schema({
  link: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "small",
  },
  fileSize: Number,
  upLoader: { type: Schema.Types.ObjectId, ref: "User" },
  mimetype: String,
  imageAttachment: {
    type: String,
    default: "appsupport",
  },
  originName: String,
  storeRoute: String,
});

export default mongoose.model<IImage>("Image", ImageSchema);
