/**
 *
 * @param {import("next/types").NextApiRequest} req
 * @param {import("next/types").NextApiResponse} res
 */
import connectDB from "../../../../components/db/connectDB.js";
import ResCaptcha from "../../../../components/db/models/ResCaptcha.js";

export default async function verifyRescaptcha(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return 0;
  }
  await connectDB(); // get the db connection
  const { uid, guess } = req.body; // get the uid and guess from the request body
  let dbData = await ResCaptcha.findOne({ uid: uid }); // get the data from the db with the uid
  if (dbData === null) {
    res.status(400).json({ error: "Invalid uid" });
    return 0;
  }
  if ((dbData.solved >= 3) | (dbData.solved === true)) {
    res.status(400).json({ error: "Too many guesses or already solved" });
    return 0;
  }
  if (Date.now() - dbData.dateCreated > 60 * 1000) {
    dbData.delete();
    res.status(400).json({ error: "Expired" });
    return 0;
  }

  let guesses = guess
    .split(",")
    .map((x) => x.replace(/ /g, ""))
    .map((x) => x.toUpperCase());
  let correct = 0;

  for (let i = 0; i < dbData.testPlates.length; i++) {
    if (dbData.testPlates[i] !== guesses[i]) {
      dbData["solved"] = dbData.solved + 1;
      await ResCaptcha.where({ uid: uid }).updateOne(dbData);

      res.status(200).json({ correct: false });
      return 0;
    }
    correct++;
  }

  let trainvals = guesses.slice(correct, guesses.length);
  dbData.trainPlates = trainvals;
  dbData["solved"] = true;
  let response = await ResCaptcha.where({ uid: uid }).updateOne(dbData);
  if (response === null) {
    res.status(200).json({ correct: true, error: "Internal server error" });
    return 0;
  }
  res.status(200).json({ correct: true });
}
