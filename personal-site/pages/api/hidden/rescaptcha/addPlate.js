/**
 *
 * @param {import("next/types").NextApiRequest} req
 * @param {import("next/types").NextApiResponse} res
 */
import connectDB from "../../../../components/db/connectDB.js";
import ResCaptchaData from "../../../../components/db/models/ResCaptchaData.js";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
export default withApiAuthRequired(async function addPlate(req, res) {
  const { url, value } = req.body;
  const { user } = getSession(req, res);
  // console.log(user);
  if (user.sub !== process.env.ADMINSUB) {
    res.status(401).redirect("/");
    return 0;
  }
  await connectDB();
  let newPlate;
  if (value === null) {
    newPlate = await ResCaptchaData.create({
      url: url,
      isSolved: false,
      content: "",
    });
  } else {
    newPlate = await ResCaptchaData.create({
      url: url,
      isSolved: true,
      content: value,
    });
  }
  if (newPlate === null) {
    res.status(400).json({ error: "Internal server error" });
    return 0;
  }
  res.status(200).json({ success: true });
});
