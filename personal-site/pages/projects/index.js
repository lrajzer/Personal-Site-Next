import Layout from "../../components/Layout";
import styles from "../../styles/Projects.module.css";
import Link from "next/link";
import Image from "next/image";
import pythonSolver from "../../public/imgs/solver.png";

export default function Projects() {
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
              <a href="https://ttfonte.com/" target="_blank" rel="noreferrer">
                <h2 className={styles.projectTitle}>TTFonte.com</h2>
                <p className={styles.projectDescription}>
                  This is a simple webpage created by me for my current
                  employer. It uses Next.JS as the framework.
                </p>
                <embed
                  type="text/html"
                  src="https://ttfonte.com/"
                  className={styles.embededMPT}
                />
              </a>
            </div>
            {/* <div className={styles.project}>
              <Link href="/projects/cpp" className={styles.projectsHeading}>
                C++
              </Link>
            </div> */}
          </div>
        </section>
      </div>
    </Layout>
  );
}
