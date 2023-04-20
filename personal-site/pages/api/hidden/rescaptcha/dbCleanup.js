import connectDB from "../../../../components/db/connectDB.js";
import ResCaptchaData from "../../../../components/db/models/ResCaptchaData.js";
import ResCaptcha from "../../../../components/db/models/ResCaptcha.js";

export default async function handler(req, res) {
  await connectDB();
  let plates = {};

  for await (const doc of ResCaptcha.find()) {
    // console.log(doc);
    if (doc.solved === true) {
      //   console.log("adding plate to plates");
      for (let i = 0; i < doc.trainPlates.length; i++) {
        if (doc.trainImgs[i] in plates) {
          if (doc.trainPlates[i] in plates[doc.trainImgs[i]]) {
            plates[doc.trainImgs[i]][doc.trainPlates[i]]["count"]++;
          } else {
            plates[doc.trainImgs[i]][doc.trainPlates[i]] = { count: 1 };
          }
          plates[doc.trainImgs[i]]["total"]++;
          //   console.log("counted");
        } else {
          plates[doc.trainImgs[i]] = { total: 1 };
          plates[doc.trainImgs[i]][doc.trainPlates[i]] = { count: 1 };
          //   console.log("added");
        }
      }
      await doc.delete();
    } else if (Date.now() - doc.dateCreated > 3 * 60 * 1000) {
      await doc.delete();
    }
  }

  console.log(plates);

  let addedPlates = {};

  for (const [key, value] of Object.entries(plates)) {
    for (const [plate, data] of Object.entries(value)) {
      if (plate !== "total") {
        if (data["count"] > 3) {
          if (data["count"] / value.total > 0.7) {
            console.log("Adding trained plate to db");
            if (!(await ResCaptchaData.findOne({ content: plate }))) {
              let data = new ResCaptchaData({
                content: plate,
                url: key,
                isSolved: true,
              });
              addedPlates[plate] = key;
              await data.save();
            } else {
              console.log("Plate already exists in db... weird...");
            }
          }
        }
      }
    }
  }

  res.status(200).json({ addedPlates });
}
