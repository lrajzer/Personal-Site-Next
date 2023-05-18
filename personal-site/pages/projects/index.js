import Layout from "../../components/Layout";
import styles from "../../styles/Projects.module.css";
import Link from "next/link";
import Image from "next/image";
import pythonSolver from "../../public/imgs/solver.png";
import { ResCaptchaElem } from "../../components/hidden/ResCaptcha";
import connectDB from "../../components/db/connectDB";
import ResCaptcha from "../../components/db/models/ResCaptcha";
import ResCaptchaData from "../../components/db/models/ResCaptchaData";

export default function Projects({ imgs, uid }) {
  return (
    <Layout
      title="My projects"
      description="Check out my projects made in Pyhton, Javascript, and other languages."
    >
      <div className={styles.mainContent}>
        <h1 className={styles.projectsTitle}>My projects</h1>
        <h2 className={styles.projectsCaption}>
          It&apos;s best to check out each project by clicking on it&apos;s
          name.
          <br />
          To explore more projects from each category, click on the language.
        </h2>
        <section className={styles.projectsTable}>
          <div className={styles.row}>
            <div className={styles.project}>
              <Link href="/projects/python" className={styles.projectsHeading}>
                Python
              </Link>
              <a
                href="https://github.com/MichalRajzer/Sudoku-Solver"
                target="_blank"
                rel="noreferrer"
              >
                <h2 className={styles.projectTitle}>Sudoku solver</h2>
                <p className={styles.projectDescription}>
                  This was a simple recursive backtracking solver that I tried
                  to speedrun.
                </p>
                <div className={styles.projImgWrapper}>
                  <Image
                    src={pythonSolver}
                    alt="Image of a sudoku solver in Python."
                    layout="fill"
                    style={{ width: "100%", height: "unset" }}
                  />
                </div>
              </a>
            </div>
            <div className={styles.project}>
              <Link
                href="/projects/javascript"
                className={styles.projectsHeading}
              >
                Javascript
              </Link>
              <h2 className={styles.projectTitle}>ResCAPTCHA</h2>
              <p className={styles.projectDescription}>
                This is a simple ReCAPTCHA clone that I made for use in my
                research projects, eg. if I need to process a lot of data for an
                AI dataset.
              </p>
              <ResCaptchaElem imgs={imgs} uid={uid} />
            </div>
          </div>
        </section>
      </div>
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
