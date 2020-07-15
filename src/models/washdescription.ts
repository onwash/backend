import mongoose, { Schema, Document } from "mongoose";
import { IMapSettings } from "./mapsettings";

export interface IWashDescription extends Document {
  coordinatesId: string;
  washname: string;
  adress: string;
  showonmap: boolean;
  uptime: string;
  options: Array<IMapSettings>;
  social: {
    raiting: number;
    likesCount: {
      userId: string;
      count: number;
    };
    views: {
      userId: string;
      count: number;
    };
  };
  postCount: number;
  region: string;
}

const WashDescriptionSchema = new Schema(
  {
    coordinatesId: {
      type: Schema.Types.ObjectId,
      ref: "Сoordinates",
    },
    washname: { type: String, required: true },
    adress: { type: String, required: true },
    showonmap: { type: Boolean, default: true },
    uptime: { type: String },
    options: [
      {
        type: Schema.Types.ObjectId,
        ref: "MapSettings",
      },
    ],
    social: {
      raiting: { type: Number, default: 0 },
      likesCount: {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        count: { type: String, default: 0 },
      },
      views: {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        count: { type: String, default: 0 },
      },
    },
    postCount: { type: Number },
    region: { type: Schema.Types.ObjectId, ref: "Region", required: true },
  },
  {
    timestamps: true,
  }
);

const WashDescriptionModel = mongoose.model<IWashDescription>(
  "WashDescription",
  WashDescriptionSchema
);

export default WashDescriptionModel;
