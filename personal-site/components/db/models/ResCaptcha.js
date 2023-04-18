import { Schema, model, models } from "mongoose";

const ResCaptcha = new Schema({
  uid: { type: String, unique: true, required: true, index: true },
  testPlates: { type: Schema.Types.Mixed },
  trainPlates: { type: Schema.Types.Mixed },
  testImgs: { type: Schema.Types.Mixed },
  trainImgs: { type: Schema.Types.Mixed },
  dateCreated: { type: Date, required: true },
  solved: { type: Schema.Types.Mixed, default: false },
});

export default models.ResCaptcha || model("ResCaptcha", ResCaptcha);
