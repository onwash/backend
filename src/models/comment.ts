import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
  },
  creatorRaiting: { type: Number },
  washid: { type: Schema.Types.ObjectId, ref: "WashDescription" },
});
export default mongoose.model("Comment", commentSchema);
