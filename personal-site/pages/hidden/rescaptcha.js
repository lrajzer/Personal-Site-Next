import styles from "../../styles/ResCaptcha.module.css";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Image from "next/legacy/image";
import connectDB from "../../components/db/connectDB";
import ResCaptcha from "../../components/db/models/ResCaptcha";
import ResCaptchaData from "../../components/db/models/ResCaptchaData";
import Link from "next/link";
import { ResCaptchaElem } from "../../components/hidden/ResCaptcha";

export default function ResCaptchaPage({ imgs, uid }) {
  return (
    <Layout isMonoLang={true}>
      <div className={styles.content}>
        <h1>ResCaptcha</h1>
        <p>
          This is a small project that I made to learn how the original
          ReCAPTCHA worked and I made this to use in future projects :3 <br />
          The intended use is to use it as a tool for creating large datasets
          for ML. <br />
          The images used in this example are from the site{" "}
          <Link href="https://platesmania.com/">PlatesMania.com</Link>. The code
          is of course available on my{" "}
          <Link href="https://github.com/MichalRajzer/Personal-Site-Next/blob/main/personal-site/pages/hidden/rescaptcha.js">
            GitHub
          </Link>
          .
        </p>
      </div>
      <ResCaptchaElem imgs={imgs} uid={uid} />
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  await connectDB();
  let uid;
  do {
    uid =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15); // copilot whispered this and it works I guess?
  } while ((await ResCaptcha.findOne({ uid: uid })) !== null);

  let testPlates = await ResCaptchaData.aggregate([
    { $match: { isSolved: true } },
    { $sample: { size: 3 } },
  ]);

  let trainPlates = await ResCaptchaData.aggregate([
    { $match: { isSolved: false } },
    { $sample: { size: 3 } },
  ]);

  let testUrls = [];
  let testVals = [];
  let trainUrls = [];

  testPlates.map((plate) => {
    testUrls.push(plate.url);
    testVals.push(plate.content);
  });
  trainPlates.map((plate) => {
    trainUrls.push(plate.url);
  });

  console.log(testUrls, testVals, trainUrls);

  const imgsServerside = {
    testVals: testVals,
    tests: testUrls,
    train: trainUrls,
  }; // TODO: for now this is hardcoded, change it so it generates some data on the fly...

  const data = {
    uid: uid,
    testPlates: imgsServerside.testVals,
    trainPlates: [],
    testImgs: imgsServerside.tests,
    trainImgs: imgsServerside.train,
    dateCreated: new Date(),
    solved: false,
  };

  const dbData = await ResCaptcha.create(data);
  if (dbData === null) {
    res.status(500).json({ error: "Internal server error" });
    return 0;
  }

  const imgs = {
    tests: imgsServerside.tests,
    train: imgsServerside.train,
  };
  return { props: { imgs: imgs, uid: uid } };
};
