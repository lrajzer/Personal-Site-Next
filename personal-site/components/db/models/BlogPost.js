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
  commentIDs: { type: String },
  dateCreated: {type: Date, required: true},
  dateModified: {type: Date},
});

export default models.BlogPost || model('BlogPost', BlogPost);
