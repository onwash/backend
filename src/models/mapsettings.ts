import mongoose, { Schema, Document } from "mongoose";
import { IImage } from "./image";

export interface IMapSettings extends Document {
  title: string;
  subtitle: string;
  selected: boolean;
  useInMapOption: boolean;
  icon: IImage;
  archived: boolean;
  creator: string;
}
const MapSettingsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: String,
  selected: {
    type: Boolean,
    required: true,
    default: false,
  },
  useInMapOption: {
    type: Boolean,
    required: true,
    default: false,
  },
  icon: {
    type: Schema.Types.ObjectId,
    ref: "Image",
  },
  archived: {
    type: Boolean,
    required: true,
    default: false,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("MapSettings", MapSettingsSchema);
