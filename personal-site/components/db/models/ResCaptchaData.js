import { Schema, model, models } from "mongoose";

const ResCaptchaData = new Schema({
  url: { type: String, required: true, unique: true },
  isSolved: { type: Boolean, default: false },
  content: { type: String },
});

export default models.ResCaptchaData || model("ResCaptchaData", ResCaptchaData);
