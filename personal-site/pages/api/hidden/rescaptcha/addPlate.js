/**
 *
 * @param {import("next/types").NextApiRequest} req
 * @param {import("next/types").NextApiResponse} res
 */
import connectDB from "../../../../components/db/connectDB.js";
import ResCaptchaData from "../../../../components/db/models/ResCaptchaData.js";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
export default withApiAuthRequired(async function addPlate(req, res) {
  const { piu, isTrain, piuData } = req.body;
  console.log(piu, isTrain, piuData);
  const { user } = getSession(req, res);
  if (user.sub !== process.env.ADMINSUB) {
    res.status(401).redirect("/");
    return 0;
  }
  await connectDB();
  let newPlate;

  if ((await ResCaptchaData.findOne({ url: piu })) !== null) {
    res.status(400).json({ error: "Plate already exists" });
    return 0;
  }

  if (isTrain === false) {
    newPlate = await ResCaptchaData.create({
      url: piu,
      isSolved: false,
      content: "",
    });
  } else {
    newPlate = await ResCaptchaData.create({
      url: piu,
      isSolved: true,
      content: piuData.replace(/ /g, "").toUpperCase(),
    });
  }
  if (newPlate === null) {
    res.status(400).json({ error: "Internal server error" });
    return 0;
  }
  res.status(200).json({ success: true });
});
