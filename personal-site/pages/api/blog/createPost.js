/**
 *
 * @param {import("next/types").NextApiRequest} req
 * @param {import("next/types").NextApiResponse} res
 */
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import connectDB from "../../../components/db/connectDB.js";
import BlogPost from "../../../components/db/models/blogPost.js";

export default withApiAuthRequired(async function addPost(req, res) {
  const { uid, title, content } = req.query;
  const { user } = getSession(req, res);
  // console.log(user);
  if (user.sub !== process.env.ADMINSUB)
  {
    res.status(401).json({ error: "unathorized" });
    return 0;
  }
  if (!uid || !title || !content) {
    // console.log("It should quit here");
    res.status(400).json({
      missing:
        (uid ? " " : "uid ") +
        (title ? " " : "title ") +
        (content ? " " : "content "),
    });
    return 0;
  }
  await connectDB();
  let existingPost = await BlogPost.findOne({ uid: uid });
  // console.log(existingPost);
  if (existingPost === null) {
    let newPost = await BlogPost.create({
      uid: uid,
      title: title,
      content: content,
      dateCreated: new Date(),
    });
    res.status(200).json({ post: newPost });
    return 0;
  }
  res.status(400).json({ error: "already exists" });
});
