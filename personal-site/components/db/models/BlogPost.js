import { Schema, model, models } from "mongoose";

const BlogPost = new Schema({
  uid: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  commentIDs: { type: Schema.Types.Mixed }, // Needed for future functionality
  dateCreated: { type: Date, required: true },
  dateModified: { type: Date },
  coverImageURL: { type: String },
  coverImageAlt: { type: String },
  lang: { type: String },
  type: { type: String }, // Needed for future functionality
  draft: { type: Boolean },
});

export default models.BlogPost || model("BlogPost", BlogPost);
