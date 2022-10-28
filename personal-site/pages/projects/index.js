import Layout from "../../components/Layout";
import styles from "../../styles/Projects.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Projects() {
  return (
    <Layout>
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
                  to speedrun, without touching Python for more or less half a
                  year.
                </p>
                <div className={styles.projImgWrapper}>
                  <Image
                    src="/imgs/solver.png"
                    layout="fill"
                    objectFit="contain"
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
            <div className={styles.project}>
              <Link href="/projects/arduino" className={styles.projectsHeading}>
                Arduino
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
