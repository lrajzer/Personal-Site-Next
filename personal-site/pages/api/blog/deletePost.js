/**
 *
 * @param {import("next/types").NextApiRequest} req
 * @param {import("next/types").NextApiResponse} res
 */

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import connectDB from "../../../components/db/connectDB.js";
import BlogPost from "../../../components/db/models/BlogPost.js";

export default withApiAuthRequired (async function addPost(req, res) {
  const { uid } = req.query;
  const { user } = getSession(req, res);
  if (!uid) {
    res.status(400).json({ missing: "uid" });
    return 0;
  }
  if (user.sub !== process.env.ADMINSUB) {
    res.status(401).json({ error: "unathorized" });
    return 0;
  }
  await connectDB();
  try {
  BlogPost.deleteOne({ uid: uid }, function (err) {
    if (err) return handleError(err);
  });
  res.status(200).json({sucess: true})
  }
  catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});
